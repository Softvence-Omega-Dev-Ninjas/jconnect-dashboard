import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../features/auth/authSlice";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://jconnect-server.saikat.com.bd",
  prepareHeaders: (headers) => {
    const token = Cookies.get("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401 || result?.error?.status === 403) {
    api.dispatch(logout());
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Auth",
    "Payments",
    "Users",
    "Disputes",
    "Reports",
    "Settings",
    "User",
    "Transactions",
    "Notifications",
    "NotificationSettings"
  ],
  endpoints: () => ({}),
});
