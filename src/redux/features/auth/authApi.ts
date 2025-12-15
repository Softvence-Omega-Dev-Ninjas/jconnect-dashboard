import { baseApi } from "../../api/baseApi";
import { LoginRequest, LoginResponse, UserMeResponse } from "./authTypes";

export type SendCodePayload = {
  // method: "email" | "phone";
  email?: string;
  phone?: string;
};
interface SendCodeResponseData {
    resetToken: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    sendPasswordResetCode: builder.mutation<
      { message: string; success: boolean; data: SendCodeResponseData },
      SendCodePayload
    >({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: data,
      }),
    }),

    getMe: builder.query<UserMeResponse, void>({
      query: () => "/users/me",
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetMeQuery,
  useSendPasswordResetCodeMutation,
} = authApi;
