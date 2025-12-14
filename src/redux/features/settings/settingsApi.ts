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
        url: '/settings',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Settings'],
    }),
  }),
});

export const { 
  useGetPlatformSettingsQuery, 
  useUpdatePlatformSettingsMutation 
} = settingsApi;