import RevenueChart from "./components/RevenueChart/RevenueChart";
import StatCardGrid from "./components/StatCards/StatCardGrid";
import { TopSellers } from "./components/TopSeller/TopSeller";


export default function Dashboard() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div >
        <h1 className="text-xl md:text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-500 text-xs md:text-sm mt-1">
          Get a complete overview of users, revenues and disputes at a glance
        </p>
      </div>

      <StatCardGrid />

      {/* Revenue Chart */}
      <RevenueChart />
      <TopSellers />
    </div>
  );
}
