import { baseApi } from "@/redux/api/baseApi";

interface PlatformSettings {
  id: string;
  platformFee_percents: number;
  minimum_payout: number;
  createdAt: string;
  updatedAt: string;
}

interface UpdatePlatformSettingsRequest {
  platformFee_percents?: number;
  minimum_payout?: number;
}

export interface NotificationSetting {
  id: string;
  email: boolean;
  userUpdates: boolean;
  serviceCreate: boolean;
  review: boolean;
  post: boolean;
  message: boolean;
  userRegistration: boolean;
  Service: boolean;
  userId: string;
}

export interface NotificationSettingsResponse {
  message: string;
  data: NotificationSetting;
}

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlatformSettings: builder.query<PlatformSettings, void>({
      query: () => "/settings",
      providesTags: ["Settings"],
    }),

    updatePlatformSettings: builder.mutation<
      PlatformSettings,
      UpdatePlatformSettingsRequest
    >({
      query: (data) => ({
        url: "/settings",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Settings"],
    }),
    createAnnouncement: builder.mutation({
      query: (data) => ({
        url: "/settings/announcement",
        method: "POST",
        body: data,
      }),
    }),
    getNotificationSettings: builder.query<NotificationSettingsResponse, void>({
      query: () => "/notification-setting",
      providesTags: ["NotificationSettings"],
    }),
    updateNotificationSettings: builder.mutation<
      NotificationSettingsResponse,
      Partial<NotificationSetting>
    >({
      query: (data) => ({
        url: "/notification-setting",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["NotificationSettings"],
    }),
  }),
});

export const {
  useGetPlatformSettingsQuery,
  useUpdatePlatformSettingsMutation,
  useCreateAnnouncementMutation,
  useGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
} = settingsApi;
