import { baseApi } from "../../api/baseApi";

// --- Interfaces ---
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
  withdrawn_amount: number;
  role: string;
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

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const disputesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDisputes: builder.query<
      DisputeResponse[],
      { searchTerm?: string } | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();

        if (params && params.searchTerm) {
          queryParams.append("search", params.searchTerm);
        }

        return {
          url: `/disputes/filter?${queryParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Disputes"],
      transformResponse: (response: ApiResponse<DisputeResponse[]>) =>
        response.data,
    }),
    getDisputeById: builder.query<DisputeResponse, string>({
      query: (id) => `/disputes/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Disputes", id }],
      transformResponse: (
        response: ApiResponse<DisputeResponse> | DisputeResponse
      ): DisputeResponse => {
        if ("data" in response && response.data) return response.data;
        return response as DisputeResponse;
      },
    }),

    updateDisputeStatus: builder.mutation<
      DisputeResponse,
      { id: string; status: string; resolution?: string }
    >({
      query: ({ id, status, resolution }) => ({
        url: `/disputes/${id}`,
        method: "PATCH",
        body: { status, resolution },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Disputes",
        { type: "Disputes", id },
      ],
    }),
  }),
});

export const {
  useGetDisputesQuery,
  useGetDisputeByIdQuery,
  useUpdateDisputeStatusMutation,
} = disputesApi;
