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
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type ApiItem = { month: string; revenue: number };
type ApiResponse = ApiItem[];

export default function RevenueChart() {
  const [revenue, setRevenue] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOverview = async () => {
      setError(null);
      const token = Cookies.get("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(
          "http://103.174.189.183:5050/admin/dashboard-stats/revenue-by-month",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            timeout: 15000,
          }
        );
        // expect res.data.data to be an array like your example
        const payload: ApiResponse = res.data?.data ?? res.data ?? [];
        setRevenue(payload);
        // console.log("revenue payload:", payload);
      } catch (err: any) {
        if (err.response?.status === 401) {
          Cookies.remove("token", { path: "/" });
          Cookies.remove("role", { path: "/" });
          navigate("/login");
          return;
        }
        setError(err?.message ?? "Network error");
        console.error("fetchOverview error:", err);
      }
    };

    fetchOverview();
  }, [navigate]);

  // build chart-friendly data: [{ label: 'Jan', '2024': 0, '2025': 1000 }, ...]
  const chartData = useMemo(() => {
    if (!revenue) return null;

    // months labels
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

    // build map year -> monthIndex -> revenue
    const map: Record<string, Record<number, number>> = {};

    revenue.forEach((it) => {
      // expect format "YYYY-MM"
      const [yearStr, monthStr] = it.month.split("-");
      const year = yearStr;
      const monthIdx = Number(monthStr) - 1;
      if (!map[year]) map[year] = {};
      map[year][monthIdx] = Number(it.revenue ?? 0);
    });

    // determine which two years are present (prefer latest two if more)
    const years = Object.keys(map).sort(); // ascending
    // if there are more than 2, pick last two
    const displayYears = years.length >= 2 ? years.slice(-2) : years;

    // ensure we have two labels; fallback to ['2024','2025'] if missing
    const y1 = displayYears[0] ?? "2024";
    const y2 = displayYears[1] ?? (displayYears[0] ? displayYears[0] : "2025");

    const out = months.map((label, i) => ({
      label,
      [y1]: map[y1]?.[i] ?? 0,
      [y2]: map[y2]?.[i] ?? 0,
    }));

    // attach meta so component can reference the year keys
    (out as any).__years = [y1, y2];

    return out as (Record<string, any> & { label: string })[] | null;
  }, [revenue]);

  if (error)
    return (
      <div className="text-red-500 text-center">
        Error loading overview: {error}
      </div>
    );

  const years = chartData
    ? ((chartData as any).__years as string[])
    : ["2024", "2025"];
  const yearA = years[1] ?? "2025"; 
  const yearB = years[0] ?? "2024"; 

  return (
    <Card className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 md:mb-6">
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
                  <SelectItem value="7 days">Last 7 days</SelectItem>
                  <SelectItem value="30 days">Last 30 days</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="w-full h-[300px] md:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData ?? []}
            margin={{ top: 20, right: 40, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="label" stroke="#9ca3af" tick={{ fontSize: 12 }} />
            <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value: any) => {
                // format number as currency-ish
                return [`$${Number(value).toLocaleString()}`, "Revenue"];
              }}
            />

            {/* newest year - blue line (match your sample colors) */}
            <Line
              type="monotone"
              dataKey={yearA}
              stroke="#2D9CDB"
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 5 }}
            />

            {/* older year - red line */}
            <Line
              type="monotone"
              dataKey={yearB}
              stroke="#FF5B5B"
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 5 }}
            />

            {chartData &&
              (() => {
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
                  return (
                    <ReferenceDot
                      x={arr[maxIdx].label}
                      y={maxVal}
                      r={4}
                      stroke="#2D9CDB"
                      isFront
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
