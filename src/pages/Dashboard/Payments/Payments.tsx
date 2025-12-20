import { Users } from "lucide-react";
import RevenueChart from "../Dashboard/components/RevenueChart/RevenueChart";
import StatCard from "../Dashboard/components/StatCards/StatCard";
import TransactionHistory from "./components/TransactionHistory";
import { useGetOverviewStatsQuery } from "@/redux/features/dashboard/dashboardApi";
import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";
import NoDataFound from "@/components/Shared/NoDataFound/NoDataFound";

const Payments = () => {
  const { data, error, isLoading } = useGetOverviewStatsQuery();

  const stateCardsData = [
    {
      id: "total-revenue",
      title: "Total Revenue",
      value: data?.data ? `$${data?.data.totalRevenue.toLocaleString()}` : "$0",
      change: data?.data ? data?.data.revenuePercentage : 0,
      icon: Users,
    },
    {
      id: "stripe-payouts",
      title: "Stripe Payouts",
      value: data?.data
        ? `$${data?.data.stripePayouts.toLocaleString()}`
        : "$0",
      change: data?.data ? data?.data.stripePayoutsPercentage : 0,
      icon: Users,
    },
    {
      id: "refunds",
      title: "Refunds",
      value: data?.data ? `$${data?.data.totalRefund.toLocaleString()}` : "$0",
      change: data?.data ? data?.data.refundPercentage : 0,
      icon: Users,
    },
  ];

  if (isLoading) return <LoadingSpinner message="Loading overview stats..." />;
  if (error) {
    return <NoDataFound dataTitle="Payment Data" />;
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl lg:text-[32px] font-bold">
          Payments
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
            />
          );
        })}
      </div>
      <RevenueChart />
      <TransactionHistory />
    </div>
  );
};

export default Payments;
