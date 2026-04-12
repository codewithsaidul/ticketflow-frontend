"use client";

import { Button } from "@/components/ui/button";
import { useSocket } from "@/hooks/useSocket";
import { cn } from "@/lib/utils";
import {
  useGetEventSeatsQuery,
  useSyncSeatsMutation,
} from "@/redux/api/seatApi/seatApi";
import { useAppSelector } from "@/redux/hooks";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

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
  refetch, // Event refetch
  isLoading: isEventLoading,
  seats,
  meta,
  selectedSeats,
  onSeatClick,
}: SeatMapProps) {
  const [syncSeats] = useSyncSeatsMutation();
  const { user } = useAppSelector((state) => state.auth);
  const myUserId = user?.userId;
  const { socket, connected } = useSocket();

  // Seat API রিফেচ
  const { refetch: refetchSeats, isLoading: isSeatsLoading } =
    useGetEventSeatsQuery(eventId);

  const [optimisticLockedSeats, setOptimisticLockedSeats] = useState<string[]>(
    [],
  );
  const [initialSynced, setInitialSynced] = useState(false);

  useEffect(() => {
    if (!isSeatsLoading && seats && myUserId && !initialSynced) {
      const myLockedInDB = seats
        .filter((s: ISeat) => s.status === "locked" && s.lockedBy === myUserId)
        .map((s: ISeat) => s._id);

      myLockedInDB.forEach((id: string) => {
        if (!selectedSeats.includes(id)) onSeatClick(id);
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInitialSynced(true);
    }
  }, [
    isSeatsLoading,
    seats,
    myUserId,
    initialSynced,
    selectedSeats,
    onSeatClick,
  ]);

  useEffect(() => {
    if (!myUserId || !socket || !connected) return;

    socket.emit("join_ticket_room", eventId);

    socket.on(
      "seat-optimistic-lock",
      (payload: { seatIds: string[]; lockerId: string }) => {
        if (String(payload.lockerId) !== String(myUserId)) {
          setOptimisticLockedSeats((prev) => [
            ...new Set([...prev, ...payload.seatIds]),
          ]);
        }
      },
    );

    socket.on(
      "seat-optimistic-unlock",
      (payload: { seatIds: string[]; lockerId: string }) => {
        if (String(payload.lockerId) !== String(myUserId)) {
          setOptimisticLockedSeats((prev) =>
            prev.filter((id) => !payload.seatIds.includes(id)),
          );
        }
      },
    );

    socket.on(
      "seats-updated",
      async (payload: { updaterId: string; releasedSeatIds: string[] }) => {
        if (payload.updaterId !== myUserId) {
          await refetchSeats();
          refetch();

          if (payload.releasedSeatIds) {
            setOptimisticLockedSeats((prev) =>
              prev.filter((id) => !payload.releasedSeatIds!.includes(id)),
            );
          }
        }
      },
    );

    return () => {
      socket.off("seat-optimistic-lock");
      socket.off("seat-optimistic-unlock");
      socket.off("seats-updated");
    };
  }, [eventId, socket, connected, myUserId, refetch, refetchSeats]);

  const handleSeatClickLocal = (seatId: string) => {
    const isCurrentlySelected = selectedSeats.includes(seatId);
    onSeatClick(seatId);

    if (socket && connected) {
      const eventName = isCurrentlySelected
        ? "client-unLocking-seat"
        : "client-locking-seat";

      socket.emit(eventName, {
        eventId,
        seatIds: [seatId],
        userId: myUserId,
      });
    }

    syncSeats({
      eventId,
      seatIds: [seatId],
    });
  };

  if (isSeatsLoading && isEventLoading) {
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
    <div className="w-full bg-card border rounded-xl p-4 sm:p-8">
      <div
        className="grid gap-2 sm:gap-3 mx-auto"
        style={{
          gridTemplateColumns: `repeat(${meta?.totalCols || 10}, minmax(0, 1fr))`,
        }}
      >
        {seats.map((seat: ISeat) => {
          const isSelected = selectedSeats.includes(seat._id);
          const isBooked = seat.status === "booked";

          // অন্য কারো লক (সকেট বা ডিবি থেকে)
          const isLockedByOthers =
            (seat.status === "locked" && seat.lockedBy !== myUserId) ||
            (optimisticLockedSeats.includes(seat._id) && !isSelected);

          const isActiveByUser = isSelected; // পিওর অপটিমিস্টিক UI
          const isDisabled = isBooked || isLockedByOthers;

          return (
            <Button
              key={seat._id}
              disabled={isDisabled}
              onClick={() => handleSeatClickLocal(seat._id)}
              className={cn(
                "h-10 w-10 sm:h-12 sm:w-12 rounded-lg text-xs font-bold transition-all border",
                !isDisabled &&
                  !isActiveByUser &&
                  "bg-background text-foreground hover:border-primary",
                isActiveByUser &&
                  "bg-primary text-primary-foreground border-primary scale-105 shadow-lg",
                isBooked &&
                  "bg-muted text-muted-foreground opacity-50 cursor-not-allowed",
                isLockedByOthers &&
                  "bg-yellow-100 text-yellow-600 border-yellow-300 animate-pulse",
              )}
            >
              {isBooked ? "X" : seat.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
