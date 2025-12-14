import { baseApi } from "../../api/baseApi";

interface DisputeOrder {
  id: string;
  orderCode: string;
  amount: number;
  seller_amount: number;
  PlatfromRevinue: number;
  stripeFee: number;
  status: string;
  buyerId: string;
  sessionId: string | null;
  sellerId: string;
  sellerIdStripe: string;
  serviceId: string;
  paymentIntentId: string;
  buyerPay: number;
  platformFee: number;
  platformFee_percents: number;
  deliveryDate: string | null;
  createdAt: string;
  updatedAt: string;
  isReleased: boolean;
  releasedAt: string | null;
  proofUrl: string[];
  proofSubmittedAt: string | null;
}

interface DisputeUser {
  id: string;
  full_name: string;
  email: string;
  profilePhoto: string | null;
  phone: string | null;
  password: string;
  pinCode: number | null;
  otp: string | null;
  googleId: string | null;
  emailOtp: string | null;
  otpExpiresAt: string | null;
  isVerified: boolean;
  is_terms_agreed: boolean;
  isLogin: boolean;
  isDeleted: boolean;
  isActive: boolean;
  login_attempts: number;
  withdrawn_amount: number;
  phoneOtp: string | null;
  phoneOtpExpiresAt: string | null;
  phoneVerified: boolean;
  last_login_at: string;
  created_at: string;
  updated_at: string;
  token_expires_at: string | null;
  role: string;
  validation_type: string;
  auth_provider: string | null;
  stripeAccountId: string | null;
  sellerIDStripe: string | null;
  customerIdStripe: string | null;
}

export interface DisputeResponse {
  id: string;
  orderId: string;
  userId: string;
  description: string;
  resolution: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  proofs: string[];
  order: DisputeOrder;
  user: DisputeUser;
}

export const disputesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDisputes: builder.query<DisputeResponse[], void>({
      query: () => "/disputes",
      providesTags: ["Disputes"],
    }),
    getDisputeById: builder.query<DisputeResponse, string>({
      query: (id) => `/disputes/${id}`,
      providesTags: ["Disputes"],
    }),
  }),
});

export const { useGetDisputesQuery, useGetDisputeByIdQuery } = disputesApi;
