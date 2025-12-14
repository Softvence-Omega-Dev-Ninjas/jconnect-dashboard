import PageHeading from "@/components/Shared/PageHeading/PageHeading";
import RevenueChart from "./components/RevenueChart/RevenueChart";
import StatCardGrid from "./components/StatCards/StatCardGrid";
import TopPerformUser from "./components/TopPerformUser/TopPerformUser";
import { TopSellers } from "./components/TopSeller/TopSeller";
import UserActivity from "./components/UserActivity/UserActivity";

export default function Dashboard() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <PageHeading
        title="Dashboard"
        subtitle="Get a complete overview of users, revenues and disputes at a glance"
      />

      <StatCardGrid />

      {/* Revenue Chart */}
      <RevenueChart />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <UserActivity />
        <TopPerformUser />
      </div>

      {/* Top Sellers */}
      <TopSellers />
    </div>
  );
}
