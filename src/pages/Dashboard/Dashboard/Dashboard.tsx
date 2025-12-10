import PageHeading from "@/components/Shared/PageHeading/PageHeading";
import RevenueChart from "./components/RevenueChart/RevenueChart";
import StatCardGrid from "./components/StatCards/StatCardGrid";
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="">
          {/* User Activity */}
          <UserActivity />
        </div>
        <div className="">
          <h1>Top Perform user</h1>
        </div>
      </div>

      {/* Top Sellers */}
      <TopSellers />
    </div>
  );
}
