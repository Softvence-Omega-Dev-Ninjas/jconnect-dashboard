import { DollarSign, BanknoteArrowDown, Handshake, CircleUserRound } from "lucide-react";
import StatCard from "./StatCard";
import { useGetOverviewStatsQuery } from "@/redux/features/dashboard/dashboardApi";
import NoDataFound from "@/components/Shared/NoDataFound/NoDataFound";
import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";

export default function StatCardGrid() {
  const { data, error, isLoading } = useGetOverviewStatsQuery();

  const stats = data?.data;
  
  const stateCardsData = [
    {
      id: "total-users",
      title: "Total Users",
      value: stats?.totalUser || 0,
      change: stats?.userPercentage || 0,
      icon: CircleUserRound,
    },
    {
      id: "total-revenue",
      title: "Total Revenue",
      value: stats?.totalRevenue || 0,
      change: stats?.revenuePercentage || 0,
      icon: DollarSign,
    },
    {
      id: "total-disputes",
      title: "Total Disputes",
      value: stats?.totalDispute || 0,
      change: stats?.disputePercentage || 0,
      icon: Handshake,
    },
    {
      id: "total-refunds",
      title: "Total Refunds",
      value: stats?.totalRefund || 0,
      change: stats?.refundPercentage || 0,
      icon: BanknoteArrowDown,
    },
  ];

  if (isLoading) return <LoadingSpinner message="Loading overview stats..." />;
  if (error){
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
            icon={<IconComponent className="w-5 h-5 md:w-6 md:h-6 text-[#BD001F]" />}
            subHead={true}
          />
        );
      })}
    </div>
  );
}
