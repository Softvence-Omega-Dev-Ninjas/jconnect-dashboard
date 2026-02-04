import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hook";
import { useGetUserNotificationsQuery } from "@/redux/features/notification/notificationApi";
import {
  connectNotificationSocket,
  disconnectNotificationSocket,
} from "@/socket/notificationSocket";
import { setNotifications } from "@/redux/features/notification/notificationSlice";
import Cookies from "js-cookie";

export const useNotificationSocket = () => {
  const dispatch = useAppDispatch();
  // const user = useAppSelector((state) => state.auth.user);
  const token = Cookies.get("token"); // Add token check
  
  // Only call API if token exists (more reliable than user state)
  const { data, isLoading, refetch } = useGetUserNotificationsQuery(undefined, {
    skip: !token, // Use token instead of user
  });

  // Connect to socket only if token exists
  useEffect(() => {
    if (!token) return; // Check token instead of user
    
    const socket = connectNotificationSocket(dispatch);
    console.log(socket);
    return () => {
      disconnectNotificationSocket();
    };
  }, [dispatch, token]); // Use token dependency

  // Load initial notifications
  useEffect(() => {
    if (data?.data?.notifications) {
      const notifications = data.data.notifications.map((n) => ({
        id: n.id,
        notificationId: n.notificationId,
        type: n.type,
        title: n.title,
        message: n.message,
        createdAt: n.createdAt,
        read: n.read,
        meta: n.metadata,
      }));
      dispatch(setNotifications(notifications));
    }
  }, [data, dispatch]);

  return { isLoading, refetch };
};
