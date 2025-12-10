import StatCardGrid from "../Dashboard/components/StatCards/StatCardGrid";
import TopPerformingUsersChart from "../Dashboard/components/TopPerformUser/TopPerformUser";
import { TopSellers } from "../Dashboard/components/TopSeller/TopSeller";
import UserActivityChart from "../Dashboard/components/UserActivity/UserActivity";

const Reports = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl lg:text-[32px] font-bold">Reports & Analytics</h1>
      </div>
      
      <StatCardGrid />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="">
          {/* User Activity */}
          <UserActivityChart />
        </div>
        <div className="">
          {/* Top Perform User */}
          <TopPerformingUsersChart />
        </div>
      </div>

      {/* Top Sellers */}
      <TopSellers />
    </div>
  );
};

export default Reports;
