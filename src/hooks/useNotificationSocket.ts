import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  connectNotificationSocket,
  disconnectNotificationSocket,
} from "../socket/notificationSocket";
import { addNotification } from "@/store/notificationSlice";
import { Notification } from "@/types/notification.types";

export const useNotificationSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = connectNotificationSocket();
    if (!socket) return;

    socket.on("connect", () => {
      console.log(" Notification socket connected");
    });

    socket.on("notification", (data: Notification) => {
      dispatch(addNotification(data));
    });

    socket.on("disconnect", () => {
      console.log(" Notification socket disconnected");
    });

    return () => {
      disconnectNotificationSocket();
    };
  }, [dispatch]);
};
