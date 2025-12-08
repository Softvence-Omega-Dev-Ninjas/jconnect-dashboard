import { Users, DollarSign, RefreshCw, HeartHandshake } from "lucide-react";
import StatCard from "./StatCard";

export default function StatCardGrid() {
  const stateCardsData = [
    {
      id: "total-users",
      title: "Total Users",
      value: "1.3k",
      change: 18,
      icon: Users,
    },
    {
      id: "total-revenue",
      title: "Total Revenue",
      value: "$40,000",
      change: 20,
      icon: DollarSign,
    },
    {
      id: "total-disputes",
      title: "Total Disputes",
      value: "120",
      change: 2,
      icon: HeartHandshake,
    },
    {
      id: "total-refunds",
      title: "Total Refunds",
      value: "$5,000",
      change: -2,
      icon: RefreshCw,
    },
  ];

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
            icon={<IconComponent className="w-5 h-5 md:w-6 md:h-6 text-[#BD001F]" />}
          />
        );
      })}
    </div>
  );
};
