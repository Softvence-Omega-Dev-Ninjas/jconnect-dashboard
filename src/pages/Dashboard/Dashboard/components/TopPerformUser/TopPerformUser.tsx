import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";
import NoDataFound from "@/components/Shared/NoDataFound/NoDataFound";
import { useGetTopPerformingUsersQuery } from "@/redux/features/dashboard/dashboardApi";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

export default function TopPerformingUsersChart() {
  const { data, error, isLoading } = useGetTopPerformingUsersQuery();

  const chartData = data || [];

  const max =
    chartData.length > 0
      ? Math.max(...chartData.map((d) => d.totalAmount), 0)
      : 0;

  const domainMax = Math.ceil((max * 1) / 100) * 100 || 100;

  if (isLoading)
    return (
      <LoadingSpinner message="Loading Top Performing Users..." />
    );
  if (error)
    return (
      <NoDataFound dataTitle="Top Performing Users Data" />
    );
  if (chartData.length === 0)
    return (
      <NoDataFound dataTitle="No Top Performing Users Data Available" />
    );

  return (
    <div className="bg-white rounded shadow-sm p-3 sm:p-5">
      <div className="mb-3">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
          Top Performing Users
        </h3>
        <p className="text-xs sm:text-sm text-gray-500">By revenue generated</p>
      </div>

      <div className="w-full h-[280px] sm:h-80">
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 20, right: 10, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient
                id="singleRedGradient"
                x1="0"
                x2="1"
                y1="0"
                y2="0"
              >
                <stop offset="0%" stopColor="#BD001F" />
                <stop offset="70%" stopColor="#FF5060" />
                <stop offset="100%" stopColor="#FFB4C0" />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 6"
              horizontal={false}
              stroke="#E5E5E5"
            />

            <XAxis
              type="number"
              domain={[0, domainMax]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#666", fontSize: 10 }}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={80}
              tick={{ fill: "#333", fontWeight: 600, fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              formatter={(value: number) => [
                `$${value.toFixed(2)}`,
                "Total Revenue",
              ]}
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
            />

            <Bar dataKey="totalAmount" barSize={24} radius={[8, 8, 8, 8]}>
              {chartData.map((_, index) => (
                <Cell key={index} fill="url(#singleRedGradient)" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
