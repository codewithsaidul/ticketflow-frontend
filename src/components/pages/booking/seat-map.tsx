"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ISeat {
  _id: string;
  label: string;
  status: "AVAILABLE" | "BOOKED" | "LOCKED";
  price: number;
}

interface SeatMapProps {
  isLoading: boolean;
  seats: ISeat[];
  meta: { totalCols: number; basePrice: number };
  selectedSeats: string[];
  onSeatClick: (seatId: string) => void;
}

export default function SeatMap({
  isLoading,
  seats,
  meta,
  selectedSeats,
  onSeatClick,
}: SeatMapProps) {
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
        No seats configuration found for this event.
      </div>
    );
  }

  return (
    <div className="w-full bg-card border rounded-xl shadow-sm p-4 sm:p-8">
      <h3 className="text-xl font-heading font-bold mb-8 text-center">
        Select Seats
      </h3>

      {/* 🎭 Screen / Stage Visual */}
      <div className="w-full max-w-lg mx-auto mb-10">
        <div className="h-2 w-full bg-primary/20 rounded-full shadow-[0_4px_20px_-2px_rgba(var(--primary),0.3)]" />
        <p className="text-center text-xs text-muted-foreground mt-2 uppercase tracking-widest font-medium">
          Stage / Screen
        </p>
      </div>

      {/* 💺 Seat Grid Wrapper (Overflow handling for mobile) */}
      <div className="w-full overflow-x-auto pb-4">
        <div
          className="grid gap-2 sm:gap-3 mx-auto min-w-fit"
          style={{
            // ডাইনামিক কলাম সেটআপ
            gridTemplateColumns: `repeat(${meta?.totalCols || 10}, minmax(0, 1fr))`,
            width: meta?.totalCols > 8 ? "max-content" : "100%", // মোবাইলে যেন চ্যাপ্টা না হয়
          }}
        >
          {seats.map((seat) => {
            const isSelected = selectedSeats.includes(seat._id);
            const isBooked = seat.status === "BOOKED";
            const isLocked = seat.status === "LOCKED";
            const isDisabled = isBooked || isLocked;

            return (
              <button
                key={seat._id}
                disabled={isDisabled}
                onClick={() => onSeatClick(seat._id)}
                className={cn(
                  "h-10 w-10 sm:h-12 sm:w-12 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center border select-none",
                  
                  // 1. Available (Default)
                  !isDisabled && !isSelected &&
                    "bg-background border-border text-foreground hover:border-primary hover:text-primary hover:shadow-md",

                  // 2. Selected (Active)
                  isSelected &&
                    "bg-primary text-primary-foreground border-primary shadow-lg scale-105 ring-2 ring-primary/20",

                  // 3. Booked (Disabled)
                  isBooked &&
                    "bg-muted text-muted-foreground cursor-not-allowed border-transparent opacity-50",

                  // 4. Locked (Temporary)
                  isLocked &&
                    "bg-yellow-100 text-yellow-600 border-yellow-300 cursor-not-allowed animate-pulse"
                )}
                title={`Seat ${seat.label} - ৳${seat.price || meta.basePrice}`}
              >
                {isBooked ? "X" : seat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 🏷️ Legend (Information) */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-8 border-t pt-6">
        <LegendItem color="bg-background border border-border" label="Available" />
        <LegendItem color="bg-primary" label="Selected" />
        <LegendItem color="bg-muted opacity-50" label="Booked" />
        <LegendItem color="bg-yellow-400" label="Locked" />
      </div>
    </div>
  );
}

// Helper Component for Legend
function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn("w-4 h-4 rounded", color)} />
      <span className="text-sm text-muted-foreground font-medium">{label}</span>
    </div>
  );
}