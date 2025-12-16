import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  subHead?:boolean;
}

export default function StatCard({ title, value, change, icon, subHead = false }: StatCardProps) {
  const isPositive = change >= 10;

  return (
    <Card className="p-4 md:p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs md:text-sm text-gray-500 truncate">{title}</p>
          <h3 className="text-xl md:text-2xl font-bold mt-1 md:mt-2">{value}</h3>
          <div className="flex items-center gap-1 mt-1 md:mt-2 flex-wrap">
            {isPositive ? (
              <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-3 h-3 md:w-4 md:h-4 text-red-500" />
            )}
            <span className={`text-xs md:text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}>
              {isPositive ? "+" : ""}{change}%
            </span>
         { subHead && <span className="text-xs md:text-sm text-gray-400">vs last month</span>}
          </div>
        </div>
        <div className="p-2 md:p-3 rounded-lg bg-[#F8E6E9] shrink-0">
          {icon}
        </div>
      </div>
    </Card>
  );
}
