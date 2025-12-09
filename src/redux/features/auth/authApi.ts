import { baseApi } from "../../api/baseApi";
import { LoginRequest, LoginResponse, UserMeResponse } from "./authTypes";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getMe: builder.query<UserMeResponse, void>({
      query: () => "/users/me",
      providesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery } = authApi;
