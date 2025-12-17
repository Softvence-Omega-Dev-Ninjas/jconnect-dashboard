import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from "recharts";
import { useMemo } from "react";
import { useGetRevenueByMonthQuery } from "@/redux/features/dashboard/dashboardApi";
import NoDataFound from "@/components/Shared/NoDataFound/NoDataFound";

export default function RevenueChart() {
  const { data: revenue, error, isLoading } = useGetRevenueByMonthQuery();

  const chartData = useMemo(() => {
    if (!revenue) return null;

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const map: Record<string, Record<number, number>> = {};

    revenue.forEach((it) => {
      const [yearStr, monthStr] = it.month.split("-");
      const year = yearStr;
      const monthIdx = Number(monthStr) - 1;
      if (!map[year]) map[year] = {};
      map[year][monthIdx] = Number(it.revenue ?? 0);
    });

    const years = Object.keys(map).sort();
    const displayYears = years.length >= 2 ? years.slice(-2) : years;
    const y1 = displayYears[0] ?? "2024";
    const y2 = displayYears[1] ?? (displayYears[0] ? displayYears[0] : "2025");

    const out = months.map((label, i) => ({
      label,
      [y1]: map[y1]?.[i] ?? 0,
      [y2]: map[y2]?.[i] ?? 0,
    }));

    (out as any).__years = [y1, y2];
    return out as (Record<string, any> & { label: string })[] | null;
  }, [revenue]);

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) {
    return <NoDataFound dataTitle="Revenue Data" />;
  }

  const years = chartData ? ((chartData as any).__years as string[]) : ["2024", "2025"];
  const yearA = years[1] ?? "2025";
  const yearB = years[0] ?? "2024";

  return (
    <Card className="p-4 md:p-6">
      <div className="flex flex-col lg:flex-row items-start sm:items-center justify-between gap-4 mb-4 md:mb-6">
        <h3 className="text-lg md:text-2xl font-semibold">Total Revenue</h3>
        <div className="flex items-center gap-3 md:gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-blue-500"></div>
            <span className="text-xs md:text-sm text-gray-600">{yearA}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-500"></div>
            <span className="text-xs md:text-sm text-gray-600">{yearB}</span>
          </div>
          <div>
            <Select>
              <SelectTrigger className="w-[140px] md:w-[180px] text-xs md:text-sm">
                <SelectValue placeholder="Select a Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Date Range</SelectLabel>
                  <SelectItem value="1 year">Last One Year</SelectItem>
                  <SelectItem value="2 years">Last Two Years</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="w-full h-[250px] sm:h-[300px] md:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData ?? []} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="label" stroke="#9ca3af" tick={{ fontSize: 10 }} />
            <YAxis stroke="#9ca3af" tick={{ fontSize: 10 }} tickFormatter={(value) => `$${Number(value).toLocaleString()}`}/>
            <Tooltip formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Revenue"]} />
            <Line type="monotone" dataKey={yearA} stroke="#2B7FFF" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey={yearB} stroke="#BD001F" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 5 }} />
            {chartData && (() => {
              const arr = chartData as any[];
              let maxIdx = -1;
              let maxVal = -Infinity;
              arr.forEach((d, idx) => {
                const v = Number(d[yearA] ?? 0);
                if (v > maxVal) {
                  maxVal = v;
                  maxIdx = idx;
                }
              });
              if (maxIdx >= 0 && maxVal > 0) {
                return <ReferenceDot x={arr[maxIdx].label} y={maxVal} r={4} stroke="#2D9CDB" />;
              }
              return null;
            })()}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
