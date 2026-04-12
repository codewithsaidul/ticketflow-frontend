import { useEffect, useState } from "react";

export const useSeatSelection = (seats, userId) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [optimisticLockedSeats, setOptimisticLockedSeats] = useState<string[]>([]);

  // sync with DB
  useEffect(() => {
    const lockedByMe =
      seats?.filter(
        (s) => s.status === "locked" && s.lockedBy === userId
      ).map((s) => s._id) || [];

    setSelectedSeats(lockedByMe);
  }, [seats, userId]);

  // clean optimistic
  useEffect(() => {
    setOptimisticLockedSeats((prev) =>
      prev.filter((id) =>
        seats.some((s) => s._id === id && s.status === "locked")
      )
    );
  }, [seats]);

  return {
    selectedSeats,
    setSelectedSeats,
    optimisticLockedSeats,
    setOptimisticLockedSeats,
  };
};