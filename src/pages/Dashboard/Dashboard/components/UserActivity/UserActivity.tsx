import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

type ActivityItem = {
  date: string; // YYYY-MM-DD
  activePercentage: number; // 0 - 100
  inactivePercentage: number; // 0 - 100
};

type ApiResponse = {
  status: number;
  message?: string;
  data: ActivityItem[];
};

const dayShort = (isoDate: string) => {
  try {
    const d = new Date(isoDate + "T00:00:00");
    return d.toLocaleDateString(undefined, { weekday: "short" });
  } catch {
    return isoDate;
  }
};

export default function UserActivity() {
  const [items, setItems] = useState<ActivityItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
        const res = await axios.get<ApiResponse>(
          "http://103.174.189.183:5050/admin/dashboard-stats/user-activity-weekly",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            timeout: 15000,
          }
        );

        // your API returns data array in res.data.data
        const payload = res.data?.data ?? [];
        console.log(payload);
        // normalize: ensure we have 7 items (optional) — keep as returned order
        setItems(payload);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // Loading / error states
  if (loading) {
    return (
      <div className="p-4 bg-white rounded shadow-sm">
        <div className="text-lg font-semibold mb-2">Users Insights</div>
        <div className="text-sm text-gray-500 mb-4">
          Active vs Inactive Users (Weekly)
        </div>
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
        <div className="text-sm text-gray-500 mb-4">
          Active vs Inactive Users (Weekly)
        </div>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  // if no data
  if (!items || items.length === 0) {
    return (
      <div className="p-4 bg-white rounded shadow-sm">
        <div className="text-lg font-semibold mb-2">Users Insights</div>
        <div className="text-sm text-gray-500 mb-4">
          Active vs Inactive Users (Weekly)
        </div>
        <div className="text-gray-500">No activity data available.</div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Users Insights</h3>
          <p className="text-sm text-gray-500">
            Active vs Inactive Users (Weekly)
          </p>
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-end gap-4 px-2 md:px-6 py-6">
          {/* Determine max bar height (pixels) */}
          {items.map((it) => {
            const inactive = Math.max(
              0,
              Math.min(100, Number(it.inactivePercentage ?? 0))
            );
            const active = Math.max(
              0,
              Math.min(100, Number(it.activePercentage ?? 0))
            );

            // bar height base (we map 100% => 160px)
            const maxPx = 160;
            const inactivePx = (inactive / 100) * maxPx;
            const activePx = (active / 100) * maxPx;

            return (
              <div
                key={it.date}
                className="flex flex-col items-center w-full"
              >
                <div
                  className="relative group w-full flex justify-center items-center" 
                  style={{ height: `${maxPx}px` }}
                >
                  {/* inactive (top part) */}
                  <div
                    className="absolute bottom-0 left-0 w-full rounded-t-md"
                    style={{
                      height: `${inactivePx}px`,
                      transform: "translateY(-100%)",
                      // inactive sits above active visually: we'll render inactive on top as light block
                    }}
                    aria-hidden
                  />
                  {/* we'll instead stack active from bottom and inactive above it */}
                  <div className="absolute bottom-0 left-0 w-full flex flex-col gap-1 justify-center items-center">
                    {/* Inactive (top) */}
                    <div
                      className="w-full rounded"
                      title="inactive"
                      style={{
                        height: `${inactivePx}px`,
                        background: "#E6E6E6",
                      }}
                    />
                    {/* Active (bottom) */}
                    <div
                      className="w-full rounded"
                      title="active"
                      style={{
                        height: `${activePx}px`,
                        background: "linear-gradient(180deg,#FF3A4A,#B6001E)",
                        boxShadow: "inset 0 2px 6px rgba(0,0,0,0.15)",
                      }}
                    />
                  </div>

                  {/* Tooltip */}
                  <div className="absolute left-1/2 -translate-x-1/2 -top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
                    <div className="bg-black text-white text-xs px-2 py-1 rounded shadow">
                      <div>Active: {active}%</div>
                      <div>Inactive: {inactive}%</div>
                    </div>
                  </div>
                </div>

                {/* Day label */}
                <div className="mt-3 text-xs text-gray-600">
                  {dayShort(it.date)}
                </div>
              </div>
            );
          })}
        </div>
        {/* Legend */}
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-linear-to-b from-[#FF3A4A] to-[#B6001E]" />
            <span className="text-sm text-gray-600">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-300" />
            <span className="text-sm text-gray-600">Inactive</span>
          </div>
        </div>
      </div>
    </div>
  );
}
