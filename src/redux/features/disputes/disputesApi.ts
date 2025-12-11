import { baseApi } from "../../api/baseApi";

interface DisputeOrder {
  id: string;
  orderCode: string;
  amount: number;
  status: string;
}

interface DisputeUser {
  id: string;
  full_name: string;
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
  order: DisputeOrder;
  user: DisputeUser;
}

export const disputesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDisputes: builder.query<DisputeResponse[], void>({
      query: () => "/disputes",
      providesTags: ["Disputes"],
    }),
  }),
});

export const { useGetDisputesQuery } = disputesApi;
