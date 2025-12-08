import { Users, DollarSign, RefreshCw, HeartHandshake } from "lucide-react";
import StatCard from "./StatCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

type OverviewPayload = {
  disputePercentage: number;
  refundPercentage: number;
  revenuePercentage: number;
  totalDispute: number;
  totalRefund: number;
  totalRevenue: number;
  totalUser: number;
  userPercentage: number;
};

export default function StatCardGrid() {
  const [data, setData] = useState<OverviewPayload | null>(null);
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
          "http://103.174.189.183:5050/admin/dashboard-stats/overview",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            timeout: 15000,
          }
        );

        // Use res.data.data if present, else fallback to res.data
        const payload = res.data?.data;
        setData(payload);
      } catch (err: any) {
        if (err.response?.status === 401) {
          Cookies.remove("token", { path: "/" });
          Cookies.remove("role", { path: "/" });
          navigate("/login");
          return;
        }
        setError(err?.message ?? "Network error");
        console.error("fetchOverview error:", err);
      } finally {
        // Any cleanup or final actions can go here
      }
    };

    fetchOverview();
  }, [navigate]);

  // console.log(data);

  const stateCardsData = [
    {
      id: "total-users",
      title: "Total Users",
      value: data ? data.totalUser.toString() : "0",
      change: data ? data.userPercentage : 0,
      icon: Users,
    },
    {
      id: "total-revenue",
      title: "Total Revenue",
      value: data ? `$${data.totalRevenue.toLocaleString()}` : "$0",
      change: data ? data.revenuePercentage : 0,
      icon: DollarSign,
    },
    {
      id: "total-disputes",
      title: "Total Disputes",
      value: data ? data.totalDispute.toString() : "0",
      change: data ? data.disputePercentage : 0,
      icon: HeartHandshake,
    },
    {
      id: "total-refunds",
      title: "Total Refunds",
      value: data ? `$${data.totalRefund.toLocaleString()}` : "$0",
      change: data ? data.refundPercentage : 0,
      icon: RefreshCw,
    },
  ];

  if (error)
    return <div className="text-red-500 text-center">Error loading overview: {error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stateCardsData.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={
              <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-[#BD001F]" />
            }
          />
        );
      })}
    </div>
  );
}
