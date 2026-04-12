import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_PROD_BACKEND_URL;


export const useSocket = () => {
  const [connected, setConnected] = useState(false);
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);
  useEffect(() => {
    // তোমার বলা পদ্ধতি: একটি ইন্টারনাল ফাংশন তৈরি করা
    const initializeSocket = () => {
      const socketInstance = io(SOCKET_URL, {
        transports: ["websocket", "polling"],
        autoConnect: true,
      });

      // ইভেন্ট লিসেনারস
      socketInstance.on("connect", () => {
        setConnected(true);
      });

      socketInstance.on("disconnect", () => {
        setConnected(false);
      });

      // সকেট ইনস্ট্যান্সটি স্টেটে সেট করা
      setSocketInstance(socketInstance);

      return socketInstance;
    };

    // ফাংশনটি কল করা
    const instance = initializeSocket();

    // ক্লিনআপ ফাংশন
    return () => {
      instance.off("connect");
      instance.off("disconnect");
    };
  }, []);

  return {
    socket: socketInstance,
    connected,
  };
};
