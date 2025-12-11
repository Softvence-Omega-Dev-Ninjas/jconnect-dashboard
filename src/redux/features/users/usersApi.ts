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

export interface UpdateUserPayload {
  full_name?: string;
  email?: string;
  profilePhoto?: string;
  phone?: string;
  password?: string;
  pinCode?: number;
  isActive?: boolean;
  isVerified?: boolean;
  isDeleted?: boolean;
  is_terms_agreed?: boolean;
  role?: string;
  validation_type?: string;
  auth_provider?: string;
  last_login_at?: string;
  token_expires_at?: string;
}

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<
      UserResponse,
      { page?: number; limit?: number; isActive?: boolean }
    >({
      query: ({ page = 1, limit = 10, isActive }) => {
        let url = `/users/getalluser?page=${page}&limit=${limit}`;
        if (isActive !== undefined) {
          url += `&isActive=${isActive}`;
        }
        return url;
      },
      providesTags: ["Users"],
    }),
    updateUser: builder.mutation<User, { id: string; data: UpdateUserPayload }>(
      {
        query: ({ id, data }) => ({
          url: `/users/${id}`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ["Users"],
      }
    ),

    deleteUser: builder.mutation<{ success: boolean; message: string }, string>(
      {
        query: (id) => ({
          url: `/users/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Users"],
      }
    ),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
