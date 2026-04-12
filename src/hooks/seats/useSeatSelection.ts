import { ISeat } from "@/types";
import { useEffect, useState } from "react";

export const useSeatSelection = (seats: ISeat[], userId: string) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [optimisticLockedSeats, setOptimisticLockedSeats] = useState<string[]>([]);

  // sync with DB
  useEffect(() => {
    const lockedByMe =
      seats?.filter(
        (s) => s.status === "locked" && s.lockedBy === userId
      ).map((s) => s._id) || [];

    const func = () => {
      setSelectedSeats(lockedByMe);
    }
    func();
  }, [seats, userId]);

  // clean optimistic
  useEffect(() => {
    const optimisticLock = () => {
          setOptimisticLockedSeats((prev) =>
      prev.filter((id) =>
        seats.some((s) => s._id === id && s.status === "locked")
      )
    );
    }

    optimisticLock()
  }, [seats]);

  return {
    selectedSeats,
    setSelectedSeats,
    optimisticLockedSeats,
    setOptimisticLockedSeats,
  };
};