import { Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MONTHS } from "@/components/Shared/Month/Month";

interface FilterBarProps {
  statusFilter: string;
  onStatusChange: (status: string) => void;

  monthFilter: string;
  onMonthChange: (month: string) => void;

  sortOrder: string;
  onSortChange: (order: "asc" | "desc") => void;

  onExport?: () => void;
}

const PaymentFilterBar = ({
  statusFilter,
  onStatusChange,
  monthFilter,
  onMonthChange,
  sortOrder,
  onSortChange,
  onExport,
}: FilterBarProps) => {
  return (
    <div className="flex flex-col lg:flex-row lg:flex-wrap items-start lg:items-center gap-3 md:gap-4 p-3 md:p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full lg:w-auto">
        <span className="text-sm font-medium whitespace-nowrap">Status:</span>
        <div className="bg-white p-2 md:p-3 rounded-2xl border flex flex-wrap gap-1">
          <button
            onClick={() => onStatusChange("all")}
            className={`px-2 md:px-3 py-1.5 text-xs font-medium rounded ${statusFilter === "all"
              ? "btn-primary bg-indigo-600 text-white"
              : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            All
          </button>
          <button
            onClick={() => onStatusChange("PENDING")}
            className={`px-2 md:px-3 py-1.5 text-xs font-medium rounded ${statusFilter === "PENDING"
              ? "btn-primary bg-yellow-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            Pending
          </button>
          <button
            onClick={() => onStatusChange("IN_PROGRESS")}
            className={`px-2 md:px-3 py-1.5 text-xs font-medium rounded ${statusFilter === "IN_PROGRESS"
              ? "btn-primary bg-blue-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            In Progress
          </button>
          <button
            onClick={() => onStatusChange("RELEASED")}
            className={`px-2 md:px-3 py-1.5 text-xs font-medium rounded ${statusFilter === "RELEASED"
              ? "btn-primary bg-green-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            Released
          </button>
          <button
            onClick={() => onStatusChange("PROOF_SUBMITTED")}
            className={`px-2 md:px-3 py-1.5 text-xs font-medium rounded ${statusFilter === "PROOF_SUBMITTED"
              ? "btn-primary bg-purple-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            Proof Submitted
          </button>
          <button
            onClick={() => onStatusChange("CANCELLED")}
            className={`px-2 md:px-3 py-1.5 text-xs font-medium rounded ${statusFilter === "CANCELLED"
              ? "btn-primary bg-red-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            Cancelled
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full lg:w-auto">
        <span className="text-sm font-medium whitespace-nowrap">Date Range:</span>
        <Select value={monthFilter} onValueChange={onMonthChange}>
          <SelectTrigger className="w-full sm:w-[140px] text-xs bg-white">
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map((month) => (
              <SelectItem key={month.value} value={month.value}>
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full lg:w-auto">
        <span className="text-sm font-medium whitespace-nowrap">Sort By:</span>
        <Select
          value={sortOrder}
          onValueChange={(value: "asc" | "desc") => onSortChange(value)}
        >
          <SelectTrigger className="w-full sm:w-[140px] text-xs bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Newest First</SelectItem>
            <SelectItem value="asc">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Export Button */}
      <button
        onClick={onExport}
        className="w-full lg:w-auto lg:ml-auto px-4 py-2 bg-[#BD001F] text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition duration-150"
      >
        <span>Export</span>
        <Download className="w-4 h-4" />
      </button>
    </div>
  );
};

export default PaymentFilterBar;
