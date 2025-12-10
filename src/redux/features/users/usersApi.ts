import { baseApi } from "./../../api/baseApi";

export interface User {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  isActive: boolean;
  isVerified: boolean;
  created_at: string;
  role: string;
}

export interface UserResponse {
  success: boolean;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: User[];
}

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserResponse, { page?: number; limit?: number; isActive?: boolean }>({
      query: ({ page = 1, limit = 10, isActive }) => {
        let url = `/users/getalluser?page=${page}&limit=${limit}`;
        if (isActive !== undefined) {
          url += `&isActive=${isActive}`;
        }
        return url;
      },
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
