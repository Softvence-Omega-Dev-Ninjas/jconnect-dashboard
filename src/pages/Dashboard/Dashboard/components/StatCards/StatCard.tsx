import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  change: number; 
  icon: React.ReactNode;
  subHead?: boolean;
  isCurrency?: boolean;
}

export default function StatCard({ 
  title, 
  value, 
  change, 
  icon, 
  subHead = false,
  isCurrency = false 
}: StatCardProps) {
  
  const isPositive = change > 0;
  const isNegative = change < 0;
  const isNeutral = change === 0;

  return (
    <Card className="p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs md:text-sm text-gray-500 font-medium truncate">
            {title}
          </p>
          
          <h3 className="text-xl md:text-2xl font-bold mt-1 md:mt-2 text-gray-900">
            {isCurrency ? `$${value.toLocaleString()}` : value.toLocaleString()}
          </h3>
          
          <div className="flex items-center gap-1 mt-1 md:mt-2 flex-wrap">
            {isPositive && <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-green-500" />}
            {isNegative && <TrendingDown className="w-3 h-3 md:w-4 md:h-4 text-red-500" />}
            {isNeutral && <Minus className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />}

            <span className={`text-xs md:text-sm font-bold ${
              isPositive ? "text-green-500" : isNegative ? "text-red-500" : "text-gray-500"
            }`}>
              {isPositive ? "+" : ""}{change}%
            </span>

            {subHead && (
              <span className="text-[10px] md:text-xs text-gray-400 font-medium ml-1">
                vs last month
              </span>
            )}
          </div>
        </div>

        <div className="p-2 md:p-3 rounded-xl bg-red-50 text-[#BD001F] shrink-0">
          {icon}
        </div>
      </div>
    </Card>
  );
}