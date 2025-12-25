import { DollarSign, BanknoteArrowDown, HandCoins } from "lucide-react";
import RevenueChart from "../Dashboard/components/RevenueChart/RevenueChart";
import StatCard from "../Dashboard/components/StatCards/StatCard";
import TransactionHistory from "./components/TransactionHistory";
import { useGetOverviewStatsQuery } from "@/redux/features/dashboard/dashboardApi";
import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";
import NoDataFound from "@/components/Shared/NoDataFound/NoDataFound";

const Payments = () => {
  const { data, error, isLoading } = useGetOverviewStatsQuery();

  const stats = data?.data;

  const stateCardsData = [
    {
      id: "total-revenue",
      title: "Total Revenue",
      value: stats?.totalRevenue
        ? Number((stats.totalRevenue / 100).toFixed(2))
        : 0,
      change: stats?.revenuePercentage || 0,
      icon: DollarSign,
      isCurrency: true,
    },
    {
      id: "stripe-payouts",
      title: "Stripe Payouts",
      value: stats?.stripePayouts
        ? Number((stats.stripePayouts / 100).toFixed(2))
        : 0,
      change: stats?.stripePayoutsPercentage || 0,
      icon: HandCoins,
      isCurrency: true,
    },
    {
      id: "refunds",
      title: "Refunds",
      value: stats?.totalRefund
        ? Number((stats.totalRefund / 100).toFixed(2))
        : 0,
      change: stats?.refundPercentage || 0,
      icon: BanknoteArrowDown,
      isCurrency: true,
    },
  ];

  if (isLoading) return <LoadingSpinner message="Loading payment stats..." />;
  if (error)
    return (
      <NoDataFound
        dataTitle="Payment Data"
        noDataText="Could not fetch payment information."
      />
    );

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl lg:text-[32px] font-bold text-gray-800">
          Payments
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {stateCardsData.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <StatCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              isCurrency={true}
              subHead={true}
              icon={<IconComponent className="w-5 h-5 md:w-6 md:h-6" />}
            />
          );
        })}
      </div>

      {/* Chart Section */}
      <RevenueChart />

      {/* History Table Section */}
      <TransactionHistory />
    </div>
  );
};

export default Payments;
