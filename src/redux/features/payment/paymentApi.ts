import { baseApi } from "../../api/baseApi";

export interface TransactionHistoryQueryParams {
  page: number;
  limit: number;
  status?: string;
  type?: string;
  month?: number; 
  sort?: "asc" | "desc"; 
}

interface SellerInfo {
  full_name: string;
  email: string;
  id: string;
}

interface Payment {
  id: string;
  orderCode: string;
  amount: number;
  seller_amount: number;
  PlatfromRevinue: number;
  stripeFee: number;
  status: string;
  createdAt: string;
  seller: SellerInfo;
}

export interface TransactionHistoryResponse {
  success: boolean;
  message: string;
  data: Payment[];
  meta: {
    total: number;
    page: number;
    limit: number;
    lastPage: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
export const PaymentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransactionHistory: builder.query<
      TransactionHistoryResponse,
      TransactionHistoryQueryParams
    >({
      query: (params) => {
        const queryParams = new URLSearchParams({
          page: String(params.page),
          limit: String(params.limit),
          sort: params.sort || "desc",
        });

        if (params.status) {
          queryParams.append("status", params.status);
        }
        if (params.type) {
          queryParams.append("type", params.type);
        }
        if (params.month !== undefined) {
          queryParams.append("month", String(params.month));
        }

        return {
          url: `/payments/all-transaction-history?${queryParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Transactions"],
    }),
  }),
});

export const { useGetAllTransactionHistoryQuery } = PaymentsApi;