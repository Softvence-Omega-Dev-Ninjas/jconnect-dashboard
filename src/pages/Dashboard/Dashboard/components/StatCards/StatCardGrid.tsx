import {
  DollarSign,
  BanknoteArrowDown,
  Handshake,
  CircleUserRound,
} from "lucide-react";
import StatCard from "./StatCard";
import { useGetOverviewStatsQuery } from "@/redux/features/dashboard/dashboardApi";
import NoDataFound from "@/components/Shared/NoDataFound/NoDataFound";
import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";

export default function StatCardGrid() {
  const { data, error, isLoading } = useGetOverviewStatsQuery();

  const stats = data?.data;

  const toTwoDecimal = (value?: number) => Number((value ?? 0).toFixed(2));

  const stateCardsData = [
    {
      id: "total-users",
      title: "Total Users",
      value: stats?.totalUser || 0,
      change: toTwoDecimal(stats?.userPercentage),
      icon: CircleUserRound,
      isCurrency: false,
    },
    {
      id: "total-revenue",
      title: "Total Revenue",
      value: stats?.totalRevenue
        ? Number((stats.totalRevenue / 100).toFixed(2))
        : 0,
      change: toTwoDecimal(stats?.revenuePercentage),
      icon: DollarSign,
      isCurrency: true,
    },
    {
      id: "total-disputes",
      title: "Total Disputes",
      value: stats?.totalDispute || 0,
      change: toTwoDecimal(stats?.disputePercentage),
      icon: Handshake,
      isCurrency: false,
    },
    {
      id: "total-refunds",
      title: "Total Refunds",
      value: stats?.totalRefund
        ? Number((stats.totalRefund / 100).toFixed(2))
        : 0,
      change: toTwoDecimal(stats?.refundPercentage),
      icon: BanknoteArrowDown,
      isCurrency: true,
    },
  ];

  if (isLoading) return <LoadingSpinner message="Loading overview stats..." />;
  if (error) {
    return <NoDataFound dataTitle="Users Overview Date" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stateCardsData.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={
              <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-[#BD001F]" />
            }
            subHead={true}
            isCurrency={stat.isCurrency}
          />
        );
      })}
    </div>
  );
}
