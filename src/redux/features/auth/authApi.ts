import { baseApi } from "../../api/baseApi";
import { LoginRequest, LoginResponse, UserMeResponse } from "./authTypes";

export type SendCodePayload = {
  email?: string;
  phone?: string;
};
interface SendCodeResponseData {
  resetToken: string;
}

interface VerifyOtpPayload {
  emailOtp: string;
  resetToken: string;
}

interface ResendOtpPayload {
  method: "email" | "phone";
  value: string;
}

interface VerifyOtpResponse {
  message: string;
  success: boolean;
}

interface ResendOtpResponse {
  message: string;
  success: boolean;
}

export interface ResetPasswordPayload {
  resetToken: string;
  newPassword: string;
  confirmPassword: string;
}

interface ResetPasswordResponse {
  message: string;
  success: boolean;
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

    sendPasswordResetCodeEmail: builder.mutation<
      { message: string; success: boolean; data: SendCodeResponseData },
      SendCodePayload
    >({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: data,
      }),
    }),
    sendPasswordResetCodePhone: builder.mutation<
      { message: string; success: boolean; data: SendCodeResponseData },
      { phone: string }
    >({
      query: (data) => ({
        url: "/auth/phone/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpPayload>({
   query: ({ emailOtp: code, resetToken }) => ({
    url: "/auth/resend-verify-otp",
    method: "POST",
    body: { 
      emailOtp: code, 
      resetToken 
    },
   }),
  }),
    resendOtp: builder.mutation<ResendOtpResponse, ResendOtpPayload>({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordPayload
    >({
      query: (data) => ({
        url: "/auth/reset-password",
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
  useSendPasswordResetCodeEmailMutation,
  useSendPasswordResetCodePhoneMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useResetPasswordMutation
} = authApi;
