import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  useGetWeeklyUserActivityQuery,
  ActivityItem,
} from "@/redux/features/dashboard/dashboardApi";
import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";
import NoDataFound from "@/components/Shared/NoDataFound/NoDataFound";

const dayShort = (isoDate: string) => {
  try {
    const d = new Date(isoDate);
    return d.toLocaleDateString(undefined, { weekday: "short" });
  } catch {
    return isoDate;
  }
};

/* Custom tooltip showing only active/inactive for the day */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || payload.length === 0) return null;

  const activeObj = payload.find((p: any) => p.dataKey === "active");
  const inactiveObj = payload.find((p: any) => p.dataKey === "inactive");

  return (
    <div className="bg-white border shadow px-3 py-2 rounded text-sm">
      <div className="font-semibold text-gray-700">{label}</div>
      <div className="text-gray-900">
        Active: {activeObj ? activeObj.value : "—"}%
      </div>
      <div className="text-gray-600">
        Inactive: {inactiveObj ? inactiveObj.value : "—"}%
      </div>
    </div>
  );
};

export default function UserActivityChart() {
  const { data: items, isLoading, error } = useGetWeeklyUserActivityQuery();

  if (isLoading) {
    return (
      <LoadingSpinner message="Loading user activity data..." />
    );
  }

  if (error) {
    return <NoDataFound dataTitle="User Activity Data" />;
  }

  if (!items || items.length === 0) {
    return (
      <NoDataFound dataTitle="No User Activity Data Available" />
    );
  }

  const chartData = items.map((it: ActivityItem) => ({
    day: dayShort(it.date),
    active: Number(it.activePercentage ?? 0),
    inactive: Number(it.inactivePercentage ?? 0),
  }));

  return (
     <div className="bg-white rounded shadow-sm p-5 h-full">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          Users Insights
        </h3>
        <p className="text-sm text-gray-500">Active vs Inactive Users (Monthly)</p>
      </div>

      <div className="w-full h-[220px] sm:h-[260px]">
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
            barCategoryGap="5%"
          >
            <defs>
              <linearGradient id="activeGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#FF3A4A" />
                <stop offset="100%" stopColor="#B6001E" />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 6"
              vertical={false}
              stroke="#F3F4F6"
            />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
            <YAxis
              tickFormatter={(v) => `${v}%`}
              domain={[0, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10 }}
            />
            {/* <XAxis dataKey="day" tickLine={false} axisLine={false} />

            <YAxis
              domain={[0, 100]}
              tick={false}
              axisLine={false}
              tickLine={false}
              width={0}
            /> */}

            <Tooltip content={<CustomTooltip cursor={false} />} />

            <Bar
              dataKey="active"
              stackId="a"
              activeBar={false}
              fill="url(#activeGrad)"
              radius={[6, 6, 6, 6]}
            />
            <Bar
              dataKey="inactive"
              stackId="a"
              fill="#E6E6E6"
              activeBar={false}
              radius={[6, 6, 6, 6]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-3 sm:gap-4 mt-3 sm:mt-4">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
            style={{ background: "linear-gradient(180deg,#FF1F3A,#B6001E)" }}
          />
          <span className="text-xs sm:text-sm text-gray-600">Active</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gray-300" />
          <span className="text-xs sm:text-sm text-gray-600">Inactive</span>
        </div>
      </div>
    </div>
  );
}
