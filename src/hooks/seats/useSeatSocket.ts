import { useEffect } from "react";
import { useSocket } from "../useSocket";

export const useSeatSocket = ({ eventId, userId, onLock }) => {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket || !userId) return;

    const join = () => {
      socket.emit("join_ticket_room", eventId);
    };

    if (socket.connected) join();
    else socket.on("connect", join);

    socket.on("seat-optimistic-lock", onLock);

    return () => {
      socket.off("seat-optimistic-lock", onLock);
      socket.off("connect", join);
    };
  }, [socket, eventId, userId]);

  const emitLock = (seatId: string) => {
    socket?.emit("client-locking-seat", {
      eventId,
      seatIds: [seatId],
      userId,
    });
  };

  return { emitLock };
};