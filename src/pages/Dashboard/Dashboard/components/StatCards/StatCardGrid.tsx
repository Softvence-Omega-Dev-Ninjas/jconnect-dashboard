import { Users, DollarSign, RefreshCw, HeartHandshake } from "lucide-react";
import StatCard from "./StatCard";
import { useGetOverviewStatsQuery } from "@/redux/features/dashboard/dashboardApi";

export default function StatCardGrid() {
  const { data, error, isLoading } = useGetOverviewStatsQuery();
  
  const stateCardsData = [
    {
      id: "total-users",
      title: "Total Users",
      value: data?.data ? data?.data.totalUser.toString() : "0",
      change: data?.data ? data?.data.userPercentage : 0,
      icon: Users,
    },
    {
      id: "total-revenue",
      title: "Total Revenue",
      value: data?.data ? `$${data?.data.totalRevenue.toLocaleString()}` : "$0",
      change: data?.data ? data?.data.revenuePercentage : 0,
      icon: DollarSign,
    },
    {
      id: "total-disputes",
      title: "Total Disputes",
      value: data?.data ? data?.data.totalDispute.toString() : "0",
      change: data?.data ? data?.data.disputePercentage : 0,
      icon: HeartHandshake,
    },
    {
      id: "total-refunds",
      title: "Total Refunds",
      value: data?.data ? `$${data?.data.totalRefund.toLocaleString()}` : "$0",
      change: data?.data ? data?.data.refundPercentage : 0,
      icon: RefreshCw,
    },
  ];

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error loading overview</div>;

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
          />
        );
      })}
    </div>
  );
}
