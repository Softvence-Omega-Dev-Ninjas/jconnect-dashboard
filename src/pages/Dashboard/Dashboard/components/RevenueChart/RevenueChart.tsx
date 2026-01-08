/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import { useMemo, useState } from "react";
import { useGetRevenueByMonthQuery } from "@/redux/features/dashboard/dashboardApi";
import NoDataFound from "@/components/Shared/NoDataFound/NoDataFound";
import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";

export default function RevenueChart() {
  const { data: revenue, error, isLoading } = useGetRevenueByMonthQuery();
  const [dateRange, setDateRange] = useState("2 years");

  const chartData = useMemo(() => {
    if (!revenue || !Array.isArray(revenue) || revenue.length === 0) {
      return null;
    }

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    // Filter revenue data based on date range
    const filteredRevenue = revenue.filter((it) => {
      if (!it.month) return false;

      const [yearStr, monthStr] = it.month.split("-");
      if (!yearStr || !monthStr) return false;

      const year = parseInt(yearStr);
      const month = parseInt(monthStr);

      if (isNaN(year) || isNaN(month)) return false;

      if (dateRange === "1 year") {
        // Show last 12 months from current date
        if (year === currentYear) {
          return month <= currentMonth;
        } else if (year === currentYear - 1) {
          return month > currentMonth;
        }
        return false;
      } else {
        // Show last 2 years
        return year >= currentYear - 1;
      }
    });

    const map: Record<string, Record<number, number>> = {};

    // Map revenue data by year and month
    filteredRevenue.forEach((it) => {
      if (!it.month) return;

      const [yearStr, monthStr] = it.month.split("-");
      if (!yearStr || !monthStr) return;

      const year = yearStr;
      const monthIdx = Number(monthStr) - 1;

      if (isNaN(monthIdx) || monthIdx < 0 || monthIdx > 11) return;

      if (!map[year]) map[year] = {};
      // Revenue is in cents, convert to dollars
      map[year][monthIdx] = Number(it.revenue ?? 0) / 100;
    });

    const years = Object.keys(map).sort((a, b) => parseInt(a) - parseInt(b));

    // If no data, return empty structure
    if (years.length === 0) {
      return null;
    }

    let displayYears: string[];
    let showSingleYear = false;

    if (dateRange === "1 year") {
      // For 1 year view, show current year
      displayYears = [String(currentYear)];
      showSingleYear = true;
    } else {
      // For 2 years view, show last 2 years from available data
      displayYears = years.length >= 2 ? years.slice(-2) : years;
    }

    const y1 = displayYears[0] ?? String(currentYear - 1);
    const y2 = displayYears[1] ?? String(currentYear);

    const out = months.map((label, i) => ({
      label,
      [y1]: map[y1]?.[i] ?? 0,
      [y2]: map[y2]?.[i] ?? 0,
    }));

    (out as any).__years = showSingleYear ? [y1] : [y1, y2];
    (out as any).__isSingleYear = showSingleYear;
    return out as (Record<string, any> & { label: string })[] | null;
  }, [revenue, dateRange]);

  if (isLoading) {
    return (
      <LoadingSpinner
        message="Loading revenue data..."
        size="md"
      />
    );
  }

  if (error || !chartData) {
    return (
      <Card className="p-4 md:p-6">
        <NoDataFound dataTitle="Revenue Data" />
      </Card>
    );
  }

  const years = ((chartData as any).__years as string[]) || [];
  const isSingleYear = (chartData as any).__isSingleYear || false;

  const displayYear = isSingleYear ? years[0] : "";
  const yearA = years[1] ?? years[0] ?? new Date().getFullYear().toString();
  const yearB = years[0] ?? (years.length > 1 ? years[1] : String(new Date().getFullYear() - 1));

  return (
    <Card className="p-4 md:p-6">
      <div className="flex flex-col lg:flex-row items-start sm:items-center justify-between gap-4 mb-4 md:mb-6">
        <h3 className="text-lg md:text-2xl font-semibold">Total Revenue</h3>
        <div className="flex items-center gap-3 md:gap-4 flex-wrap">
          {isSingleYear ? (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-blue-500"></div>
              <span className="text-xs md:text-sm text-gray-600">
                {displayYear}
              </span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-blue-500"></div>
                <span className="text-xs md:text-sm text-gray-600">
                  {yearA}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-500"></div>
                <span className="text-xs md:text-sm text-gray-600">
                  {yearB}
                </span>
              </div>
            </>
          )}
          <div>
            <Select value={dateRange} onValueChange={setDateRange}>
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
          <LineChart
            data={chartData ?? []}
            margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="label" stroke="#9ca3af" tick={{ fontSize: 10 }} />
            <YAxis
              stroke="#9ca3af"
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => `$${Number(value).toLocaleString()}`}
            />
            <Tooltip
              formatter={(value: number | string) => [
                `$${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
                "Revenue",
              ]}
            />
            {isSingleYear ? (
              <Line
                type="monotone"
                dataKey={displayYear}
                stroke="#2B7FFF"
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 5 }}
              />
            ) : (
              <>
                <Line
                  type="monotone"
                  dataKey={yearA}
                  stroke="#2B7FFF"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey={yearB}
                  stroke="#BD001F"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  activeDot={{ r: 5 }}
                />
              </>
            )}
            {chartData && chartData.length > 0 &&
              (() => {
                const arr = chartData as any[];
                let maxIdx = -1;
                let maxVal = -Infinity;
                const activeYear = isSingleYear ? displayYear : yearA;

                arr.forEach((d, idx) => {
                  const v = Number(d[activeYear] ?? 0);
                  if (v > maxVal) {
                    maxVal = v;
                    maxIdx = idx;
                  }
                });

                // Only show reference dot if there's actual data (maxVal > 0)
                if (maxIdx >= 0 && maxVal > 0) {
                  return (
                    <ReferenceDot
                      x={arr[maxIdx].label}
                      y={maxVal}
                      r={4}
                      stroke="#2D9CDB"
                      fill="#2D9CDB"
                    />
                  );
                }
                return null;
              })()}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
