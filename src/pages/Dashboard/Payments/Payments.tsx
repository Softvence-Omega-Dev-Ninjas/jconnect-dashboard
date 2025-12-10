import { Users } from "lucide-react";
import RevenueChart from "../Dashboard/components/RevenueChart/RevenueChart"
import StatCard from "../Dashboard/components/StatCards/StatCard";

const Payments = () => {
  const stateCardsData = [
    {
      id: "Total Revenue",
      title: "Total Users",
      value:  "0",
      change: 0,
      icon: Users,
    },
    {
      id: "Stripe Payouts",
      title: "Total Users",
      value:  "0",
      change: 0,
      icon: Users,
    },
    {
      id: "Refunds",
      title: "Total Users",
      value:  "0",
      change: 0,
      icon: Users,
    },
   
  ];
  return (
     <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div >
        <h1 className="text-xl md:text-2xl lg:text-[32px] font-bold">Payments</h1>
      </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
      <RevenueChart />
    </div>
  )
}

export default Payments