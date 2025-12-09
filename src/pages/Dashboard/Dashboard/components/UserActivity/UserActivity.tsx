import  { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type ActivityItem = {
  date: string;
  activePercentage: number;
  inactivePercentage: number;
};

const dayShort = (isoDate: string) => {
  try {
    const d = new Date(isoDate + "T00:00:00");
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
      <div className="text-gray-900">Active: {activeObj ? activeObj.value : "—"}%</div>
      <div className="text-gray-600">Inactive: {inactiveObj ? inactiveObj.value : "—"}%</div>
    </div>
  );
};

export default function UserActivityChart() {
  const [items, setItems] = useState<ActivityItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivity = async () => {
      setLoading(true);
      setError(null);

      const token = Cookies.get("token");
      if (!token) {
        setError("Not authenticated");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://103.174.189.183:5050/admin/dashboard-stats/user-activity-weekly", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          timeout: 15000,
        });

        const payload: ActivityItem[] = res.data?.data ?? [];
        setItems(payload);
      } catch (err: any) {
        console.error("fetchActivity error:", err);
        if (err?.response?.status === 401) {
          setError("Unauthorized — please login again");
        } else {
          setError(err?.message ?? "Failed to fetch activity");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  if (loading) {
    return (
      <div className="p-4 bg-white rounded shadow-sm">
        <div className="text-lg font-semibold mb-2">Users Insights</div>
        <div className="text-sm text-gray-500 mb-4">Active vs Inactive Users (Weekly)</div>
        <div className="flex items-center justify-center py-10">
          <div className="animate-pulse w-40 h-8 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-white rounded shadow-sm">
        <div className="text-lg font-semibold mb-2">Users Insights</div>
        <div className="text-sm text-gray-500 mb-4">Active vs Inactive Users (Weekly)</div>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="p-4 bg-white rounded shadow-sm">
        <div className="text-lg font-semibold mb-2">Users Insights</div>
        <div className="text-sm text-gray-500 mb-4">Active vs Inactive Users (Weekly)</div>
        <div className="text-gray-500">No activity data available.</div>
      </div>
    );
  }

  // map API to recharts data shape
  const chartData = items.map((it) => ({
    day: dayShort(it.date),
    active: Number(it.activePercentage ?? 0),
    inactive: Number(it.inactivePercentage ?? 0),
  }));

  return (
    <div className="p-4 bg-white rounded shadow-sm h-full">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Users Insights</h3>
          <p className="text-sm text-gray-500">Active vs Inactive Users (Weekly)</p>
        </div>
      </div>

      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }} barCategoryGap="5%">
            <defs>
              <linearGradient id="activeGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#FF3A4A" />
                <stop offset="100%" stopColor="#B6001E" />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 6" vertical={false} stroke="#F3F4F6" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <YAxis tickFormatter={(v) => `${v}%`} domain={[0, 100]} tickLine={false} axisLine={false} />

            <Tooltip content={<CustomTooltip cursor={false}/>} />

            <Bar dataKey="active" stackId="a" activeBar={false} fill="url(#activeGrad)" radius={[6, 6, 6, 6]} />
            <Bar dataKey="inactive" stackId="a" fill="#E6E6E6" activeBar={false} radius={[6, 6, 6, 6]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ background: "linear-gradient(180deg,#FF1F3A,#B6001E)" }} />
            <span className="text-sm text-gray-600">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-300" />
            <span className="text-sm text-gray-600">Inactive</span>
          </div>
        </div>
    </div>
  );
}
