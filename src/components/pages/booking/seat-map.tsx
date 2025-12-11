"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSyncSeatsMutation } from "@/redux/api/seatApi/seatApi";
import { useAppSelector } from "@/redux/hooks";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_API_URL as string, {
  withCredentials: true,
  transports: ["websocket"],
});

interface ISeat {
  _id: string;
  label: string;
  status: "available" | "booked" | "locked";
  price: number;
  lockedBy?: string;
}

interface SeatMapProps {
  eventId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refetch: any;
  isLoading: boolean;
  seats: ISeat[];
  meta: { totalCols: number; basePrice: number };
  selectedSeats: string[];
  onSeatClick: (seatId: string) => void;
}

export default function SeatMap({
  eventId,
  refetch,
  isLoading,
  seats,
  meta,
  selectedSeats,
  onSeatClick,
}: SeatMapProps) {
  const [syncSeats] = useSyncSeatsMutation();
  const { user } = useAppSelector((state) => state.auth);
  const myUserId = user?._id;

  const [optimisticLockedSeats, setOptimisticLockedSeats] = useState<string[]>(
    []
  );
  useEffect(() => {
    if (!myUserId) return;

    socket.emit("join_ticket_room", eventId);

    socket.on(
      "seats-updated",
      (payload: { updaterId: string; releasedSeatIds?: string[] }) => {
        if (
          payload.releasedSeatIds &&
          payload.updaterId === "SYSTEM_CRON_JOB"
        ) {
          console.log(
            "🔓 System Unlock received for expired seats. Cleaning up optimistic state."
          );

          setOptimisticLockedSeats((prevSeats) =>
            prevSeats.filter(
              (seatId) => !payload.releasedSeatIds!.includes(seatId)
            )
          );

          refetch();
        } else {
          console.log(`⚡ DB Updated by ${payload.updaterId}. Refetching...`);
          setOptimisticLockedSeats([]);
          refetch();
        }
      }
    );

    socket.on(
      "seat-optimistic-lock",
      (payload: { seatIds: string[]; lockerId: string }) => {
        if (payload.lockerId !== myUserId) {
          console.log(
            "⚡ Optimistic Lock received from another user:",
            payload.seatIds
          );
          setOptimisticLockedSeats((prev) => [...prev, ...payload.seatIds]);
        }
      }
    );

    return () => {
      socket.off("seats-updated");
      socket.off("seat-optimistic-lock");
    };
  }, [eventId, refetch, myUserId]);

  useEffect(() => {
    if (!myUserId) return;

    const timer = setTimeout(() => {
      if (selectedSeats.length > 0) {
        console.log(
          `⏱️ Debouncing finished. Syncing ${selectedSeats.length} seats to DB.`
        );
      }

      syncSeats({ eventId, seatIds: selectedSeats })
        .unwrap()
        .catch((err) => {
          if (err.status === 409) {
            toast.error("One or more seats were taken just now. Retrying...");
            refetch();
          }
        });
    }, 50);

    return () => clearTimeout(timer);
  }, [selectedSeats, eventId, syncSeats, refetch, myUserId]);

  const handleSeatClickLocal = (seatId: string) => {
    onSeatClick(seatId);

    const isSelecting = !selectedSeats.includes(seatId);

    if (isSelecting) {
      socket.emit("client-locking-seat", {
        eventId,
        seatIds: [seatId],
        userId: myUserId,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-primary w-8 h-8" />
      </div>
    );
  }

  if (!seats || seats.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground border rounded-lg bg-muted/20">
        No seats configuration found.
      </div>
    );
  }

  return (
    <div className="w-full bg-card border rounded-xl shadow-sm p-4 sm:p-8">
      {/* Screen Visual */}
      <div className="w-full max-w-lg mx-auto mb-10">
        <h3 className="text-xl font-heading font-bold mb-8 text-center">
          Select Seats
        </h3>
        <div className="h-2 w-full bg-primary/20 rounded-full shadow-[0_4px_20px_-2px_rgba(var(--primary),0.3)]" />
        <p className="text-center text-xs text-muted-foreground mt-2 uppercase tracking-widest font-medium">
          Stage / Screen
        </p>
      </div>

      {/* Grid */}
      <div className="w-full overflow-x-auto pb-4">
        <div
          className="grid gap-2 sm:gap-3 mx-auto min-w-fit"
          style={{
            gridTemplateColumns: `repeat(${
              meta?.totalCols || 10
            }, minmax(0, 1fr))`,
            width: meta?.totalCols > 8 ? "max-content" : "100%",
          }}
        >
          {seats.map((seat) => {
            // ১. আমার সিলেক্ট করা কিনা
            const isSelected = selectedSeats.includes(seat._id);
            // ২. বুকড কিনা (ডাটাবেস থেকে)
            const isBooked = seat.status === "booked";

            // ৩. ডাটাবেস লক লজিক
            const isDbLockedByMe =
              seat.status === "locked" && seat.lockedBy === myUserId;
            const isDbLockedByOthers =
              seat.status === "locked" && seat.lockedBy !== myUserId;

            // ৪. অপটিমিস্টিক লক লজিক (সকেট থেকে আসা)
            // যদি অপটিমিস্টিক লিস্টে থাকে এবং আমি সিলেক্ট না করে থাকি
            const isOptimisticLocked =
              optimisticLockedSeats.includes(seat._id) && !isSelected;

            // ৫. ফাইনাল লক স্ট্যাটাস (অন্যদের দ্বারা)
            const isLockedByOthers = isDbLockedByOthers || isOptimisticLocked;

            // ৬. বাটন ডিজেবল হবে কখন?
            const isDisabled = isBooked || isLockedByOthers;

            // ৭. আমার নিজের কাছে সিটটা কেমন দেখাবে (সিলেক্টেড বা আমার লক করা হলে নীল)
            const isActiveByUser = isSelected || isDbLockedByMe;

            return (
              <Button
                key={seat._id}
                disabled={isDisabled}
                onClick={() => handleSeatClickLocal(seat._id)}
                className={cn(
                  "h-10 w-10 sm:h-12 sm:w-12 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center border select-none cursor-pointer",

                  // A. Available (সাদা)
                  !isDisabled &&
                    !isActiveByUser &&
                    "bg-background border-border text-foreground hover:border-primary hover:text-white hover:shadow-md",

                  // B. Selected / Locked by Me (নীল)
                  isActiveByUser &&
                    "bg-primary text-primary-foreground border-primary shadow-lg scale-105 ring-2 ring-primary/20",

                  // C. Booked (ধূসর)
                  isBooked &&
                    "bg-muted text-muted-foreground cursor-not-allowed border-transparent opacity-50",

                  // D. Locked by Others (হলুদ - ওয়ার্নিং)
                  isLockedByOthers &&
                    "bg-yellow-100 text-yellow-600 border-yellow-300 cursor-not-allowed animate-pulse"
                )}
                title={`Seat ${seat.label}`}
              >
                {isBooked ? "X" : seat.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-8 border-t pt-6">
        <LegendItem
          color="bg-background border border-border"
          label="Available"
        />
        <LegendItem color="bg-primary" label="Selected" />
        <LegendItem color="bg-muted opacity-50" label="Booked" />
        <LegendItem color="bg-yellow-400" label="Locked (Others)" />
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn("w-4 h-4 rounded", color)} />
      <span className="text-sm text-muted-foreground font-medium">{label}</span>
    </div>
  );
}
