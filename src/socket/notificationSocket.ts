import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";

let socket: Socket | null = null;

export const connectNotificationSocket = () => {
  const token = Cookies.get("token");

  if (!token) return null;

  socket = io("ws://localhost:5050/notification", {
    transports: ["websocket"],
    auth: {
      token: `Bearer ${token}`,
    },
  });

  return socket;
};

export const disconnectNotificationSocket = () => {
  socket?.disconnect();
};
