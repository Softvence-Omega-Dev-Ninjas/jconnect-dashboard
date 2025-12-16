import { baseApi } from "../../api/baseApi";

export interface TransactionHistoryQueryParams {
  page: number;
  limit: number;
  status?: string; 
  type?: string;
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
        });
        if (params.status && params.status.toLowerCase() !== "all") {
          queryParams.append("status", params.status);
        }
        if (params.type && params.type.toLowerCase() !== "all") {
          queryParams.append("type", params.type);
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

export const {  useGetAllTransactionHistoryQuery } = PaymentsApi;