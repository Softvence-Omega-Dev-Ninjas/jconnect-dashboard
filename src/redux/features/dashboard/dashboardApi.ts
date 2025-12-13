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

// top performing users response type
interface UserPerformanceData {
  name: string;
  totalAmount: number;
}

interface TopPerformingUsersResponse {
  status: number;
  message: string;
  data: UserPerformanceData[];
}

//top sellers response type
interface SellerData {
  username: string;
  dealsCompleted30d: number;
  totalRevenue30d: number;
  avgOrderValue: number;
}
interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
}
interface TopSellersResponse {
  status: number;
  message: string;
  data: {
    data: SellerData[];
    pagination: PaginationInfo;
  };
}
interface TopSellersQueryParams {
  page: number;
  limit: number;
}

//User weekly activity response type
export interface ActivityItem {
 date: string;
 activePercentage: number;
 inactivePercentage: number;
}
interface UserActivityWeeklyResponse {
    status: number;
    message: string;
    data: ActivityItem[];
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOverviewStats: builder.query<OverviewStats, void>({
      query: () => "/admin/dashboard-stats/overview",
      transformResponse: (response: OverviewStats) => response,
    }),
    getRevenueByMonth: builder.query<RevenueByMonth[], void>({
      query: () => "/admin/dashboard-stats/revenue-by-month",
      transformResponse: (response: { data: RevenueByMonth[] }) =>
        response.data,
    }),

    getTopPerformingUsers: builder.query<UserPerformanceData[], void>({
      query: () => "/admin/dashboard-stats/top-performing-users",
      transformResponse: (response: TopPerformingUsersResponse) =>
        response.data,
    }),
    getTopSellers: builder.query<TopSellersResponse, TopSellersQueryParams>({
      query: ({ page, limit }) =>
        `/admin/dashboard-stats/top-sellers?page=${page}&limit=${limit}`,
      transformResponse: (response: TopSellersResponse) => response,
    }),
    getWeeklyUserActivity: builder.query<ActivityItem[], void>({
   query: () => "/admin/dashboard-stats/user-activity-weekly",
   transformResponse: (response: UserActivityWeeklyResponse) => response.data,
  }),
  }),
});

export const {
  useGetOverviewStatsQuery,
  useGetRevenueByMonthQuery,
  useGetTopPerformingUsersQuery,
  useGetTopSellersQuery,
  useGetWeeklyUserActivityQuery,
} = dashboardApi;
