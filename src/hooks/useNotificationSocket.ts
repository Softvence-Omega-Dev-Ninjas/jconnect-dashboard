import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useGetUserNotificationsQuery } from "@/redux/features/notification/notificationApi";
import {
  connectNotificationSocket,
  disconnectNotificationSocket,
} from "@/socket/notificationSocket";
import { setNotifications } from "@/redux/features/notification/notificationSlice";

export const useNotificationSocket = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user); // Add this line
  
  // Only call API if user is logged in
  const { data, isLoading, refetch } = useGetUserNotificationsQuery(undefined, {
    skip: !user, // Skip API call if no user
  });

  // Connect to socket only if user exists
  useEffect(() => {
    if (!user) return; // Add this check
    
    const socket = connectNotificationSocket(dispatch);
    console.log(socket);
    return () => {
      disconnectNotificationSocket();
    };
  }, [dispatch, user]); // Add user dependency

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
