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

// Full user detail interface
interface FullUserDetail extends User {
  profilePhoto: string | null;
  password?: string;
  pinCode: number | null;
  otp: string | null;
  googleId: string | null;
  emailOtp: string | null;
  otpExpiresAt: string | null;
  is_terms_agreed: boolean;
  isLogin: boolean;
  isDeleted: boolean;
  login_attempts: number;
  withdrawn_amount: number;
  phoneOtp: string | null;
  phoneOtpExpiresAt: string | null;
  phoneVerified: boolean;
  last_login_at: string | null;
  updated_at: string;
  token_expires_at: string | null;
  validation_type: string;
  auth_provider: string | null;
  stripeAccountId: string | null;
  sellerIDStripe: string | null;
  customerIdStripe: string | null;
  services: [];
  ReviewsReceived: [];
  profile: string | null;
}

export interface UpdateRoleResponse {
  success: boolean;
  message: string;
  data: string;
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
    getUserById: builder.query<FullUserDetail, string>({
      query: (id) => `/users/${id}`,
      transformResponse: (response: FullUserDetail) => {
        return response;
      },
      providesTags: ["User"],
    }),

    updateUser: builder.mutation<User, { id: string; data: UpdateUserPayload }>(
      {
        query: ({ id, data }) => ({
          url: `/users/${id}`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ["Users", "User"],
      }
    ),
    updateUserRole: builder.mutation<
      UpdateRoleResponse,
      { userId: string; role: string }
    >({
      query: ({ userId, role }) => ({
        url: `/users/${userId}/role?role=${role}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"],
    }),
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
  useGetUserByIdQuery,
  useUpdateUserRoleMutation,
} = usersApi;
