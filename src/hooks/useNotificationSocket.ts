import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hook";
import { useGetUserNotificationsQuery } from "@/redux/features/notification/notificationApi";
import {
  connectNotificationSocket,
  disconnectNotificationSocket,
} from "@/socket/notificationSocket";
import { setNotifications } from "@/redux/features/notification/notificationSlice";
// import { setNotifications } from "@/redux/features/notification/notificationSlice";

// import {
//   connectNotificationSocket,
//   disconnectNotificationSocket,
// } from "@/services/notificationSocket";

// import { useGetUserNotificationsQuery } from "@/store/notificationApi";

export const useNotificationSocket = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, refetch } = useGetUserNotificationsQuery();

  // Connect to socket
  useEffect(() => {
    const socket = connectNotificationSocket(dispatch);
    console.log(socket);
    return () => {
      disconnectNotificationSocket();
    };
  }, [dispatch]);

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
