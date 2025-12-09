import RevenueChart from "./components/RevenueChart/RevenueChart";
import StatCardGrid from "./components/StatCards/StatCardGrid";
import TopPerformUser from "./components/TopPerformUser/TopPerformUser";
import { TopSellers } from "./components/TopSeller/TopSeller";
import UserActivity from "./components/UserActivity/UserActivity";


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

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="">
          {/* User Activity */}
        <UserActivity />
        </div>
        <div className="">
          {/* Top Perform User */}
        <TopPerformUser />
        </div>
      </div>

      {/* Top Sellers */}
      <TopSellers />
    </div>
  );
}
