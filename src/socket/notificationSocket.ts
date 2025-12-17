import { io, Socket } from "socket.io-client";
import { AppDispatch } from "@/redux/store";
import { setSocketConnected } from "@/redux/features/notification/notificationSlice";
import { addNotification } from "@/store/notificationSlice";
import Cookies from "js-cookie";

let socket: Socket | null = null;

export const connectNotificationSocket = (dispatch: AppDispatch) => {
  const token = Cookies.get("token");

  if (!token) {
    console.warn("No token found, cannot connect to notification socket");
    return null;
  }

  //------------------ Disconnect existing socket if any------------------
  if (socket?.connected) {
    socket.disconnect();
  }

  socket = io("https://jconnect-server.saikat.com.bd/notification", {
    transports: ["websocket"],
    auth: {
      token: `Bearer ${token}`,
    },
  });

  socket.on("connect", () => {
    console.log("✅ Connected to notification socket");
    dispatch(setSocketConnected(true));
  });

  socket.on("disconnect", () => {
    console.log("❌ Disconnected from notification socket");
    dispatch(setSocketConnected(false));
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
    dispatch(setSocketConnected(false));
  });

  // ------------------ Listen for USER REGISTRATION events ---------------------------
  socket.on("user.create", (data: any) => {
    console.log("📬 New user registration notification:", data);
    const notification = {
      id: `${Date.now()}-${Math.random()}`,
      notificationId: data.meta?.id || `notif-${Date.now()}`,
      type: data.type,
      title: data.title,
      message: data.message,
      createdAt: new Date(data.createdAt).toISOString(),
      read: false,
      meta: data.meta,
    };
    dispatch(addNotification(notification));
  });

  //---------------------  Listen for SERVICE CREATE events ----------------------
  socket.on("service.create", (data: any) => {
    console.log("📬 New service creation notification:", data);
    const notification = {
      id: `${Date.now()}-${Math.random()}`,
      notificationId: data.meta?.id || `notif-${Date.now()}`,
      type: data.type,
      title: data.title,
      message: data.message,
      createdAt: new Date(data.createdAt).toISOString(),
      read: false,
      meta: data.meta,
    };
    dispatch(addNotification(notification));
  });

  //------------------------- Ping-pong for connection check -----------------------------
  socket.on("pong", () => {
    console.log("🏓 Pong received");
  });

  return socket;
};

export const disconnectNotificationSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
