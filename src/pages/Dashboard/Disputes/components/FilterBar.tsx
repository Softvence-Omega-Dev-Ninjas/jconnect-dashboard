import { Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  statusFilter: string;
  onStatusChange: (status: string) => void;
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  onExport: () => void;
}

const FilterBar = ({
  statusFilter,
  onStatusChange,
  selectedMonth,
  onMonthChange,
  onExport,
}: FilterBarProps) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentMonthIdx = new Date().getMonth();

  return (
    <div className="flex flex-col lg:flex-row lg:flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-2xl">
      <div className="flex flex-col md:flex-row items-center gap-2">
        <span className="text-sm font-bold text-gray-700">Status:</span>
        <div className="bg-white p-2 rounded-xl border flex gap-1.5">
          {["all", "UNDER_REVIEW", "RESOLVED", "REJECTED"].map((s) => (
            <button
              key={s}
              onClick={() => onStatusChange(s)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
                statusFilter === s ? "bg-[#BD001F] text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {s === "all" ? "All" : s.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-gray-700">Month:</span>
        <Select value={selectedMonth} onValueChange={onMonthChange}>
          <SelectTrigger className="w-48 bg-white border-gray-200 rounded-xl">
            <SelectValue>
              {parseInt(selectedMonth) === currentMonthIdx 
                ? "This Month" 
                : months[parseInt(selectedMonth)]}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {months.map((month, index) => (
              <SelectItem key={month} value={index.toString()}>
                {index === currentMonthIdx ? `This Month (${month})` : month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <button onClick={onExport} className="lg:ml-auto px-4 py-2 bg-[#BD001F] text-white rounded flex items-center gap-2 hover:bg-[#d60b2d] transition-all">
        <span className="text-sm font-medium">Export</span>
        <Download className="w-4 h-4" />
      </button>
    </div>
  );
};

export default FilterBar;