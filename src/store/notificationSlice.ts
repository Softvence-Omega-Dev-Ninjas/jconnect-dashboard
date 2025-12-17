import { Notification } from "@/types/notification.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
  list: Notification[];
  unread: number;
}

const initialState: NotificationState = {
  list: [],
  unread: 0,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.list.unshift(action.payload);
      state.unread += 1;
    },
    markAllRead: (state) => {
      state.unread = 0;
    },
    clearNotifications: (state) => {
      state.list = [];
      state.unread = 0;
    },
  },
});

export const { addNotification, markAllRead, clearNotifications } =
  notificationSlice.actions;

export default notificationSlice.reducer;
