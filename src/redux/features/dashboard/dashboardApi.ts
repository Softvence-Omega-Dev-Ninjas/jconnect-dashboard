import { baseApi } from "../../api/baseApi";

export interface OverviewStats {
  status: number;
  message: string;
  data?: {
    disputePercentage: number;
    refundPercentage: number;
    revenuePercentage: number;
    totalDispute: number;
    totalRefund: number;
    totalRevenue: number;
    totalUser: number;
    userPercentage: number;
  };
}

export interface RevenueByMonth {
  month: string;
  revenue: number;
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOverviewStats: builder.query<OverviewStats, void>({
      query: () => "/admin/dashboard-stats/overview",
      transformResponse: (response:  OverviewStats ) => response,
    }),
    getRevenueByMonth: builder.query<RevenueByMonth[], void>({
      query: () => "/admin/dashboard-stats/revenue-by-month",
      transformResponse: (response: { data: RevenueByMonth[] }) =>
        response.data,
    }),
  }),
});

export const { useGetOverviewStatsQuery, useGetRevenueByMonthQuery } =
  dashboardApi;
