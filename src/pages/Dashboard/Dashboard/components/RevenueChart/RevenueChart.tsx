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
} from "recharts";

const data = [
  { month: "Jan", 2025: 15000, 2024: 25000 },
  { month: "Feb", 2025: 18000, 2024: 32000 },
  { month: "Mar", 2025: 16000, 2024: 20000 },
  { month: "Apr", 2025: 20000, 2024: 28000 },
  { month: "May", 2025: 22000, 2024: 35000 },
  { month: "Jun", 2025: 38753, 2024: 25000 },
  { month: "Jul", 2025: 32000, 2024: 30000 },
  { month: "Aug", 2025: 28000, 2024: 38000 },
  { month: "Sept", 2025: 25000, 2024: 32000 },
  { month: "Oct", 2025: 20000, 2024: 18000 },
  { month: "Nov", 2025: 24000, 2024: 12657 },
  { month: "Dec", 2025: 26000, 2024: 22000 },
];

export default function RevenueChart() {
  return (
    <Card className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 md:mb-6">
        <h3 className="text-lg md:text-2xl font-semibold">Total Revenue</h3>
        <div className="flex items-center gap-3 md:gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-blue-500"></div>
            <span className="text-xs md:text-sm text-gray-600">2025</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-500"></div>
            <span className="text-xs md:text-sm text-gray-600">2024</span>
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
      <ResponsiveContainer width="100%" height={300} className="md:h-[350px]">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" stroke="#9ca3af" tick={{ fontSize: 12 }} />
          <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="2025"
            stroke="#FF5B5B"
            strokeWidth={2}
            dot={{ r: 1 }}
          />
          <Line
            type="monotone"
            dataKey="2024"
            stroke="#2D9CDB"
            strokeWidth={2}
            dot={{ r: 1 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
