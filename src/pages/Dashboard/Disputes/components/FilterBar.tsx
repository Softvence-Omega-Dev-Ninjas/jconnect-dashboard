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
  onExport?: () => void;
}

const FilterBar = ({
  statusFilter,
  onStatusChange,
  onExport,
}: FilterBarProps) => {
  const statusOptions = [
    { value: "all", label: "All" },
    { value: "UNDER_REVIEW", label: "Under Review" },
    { value: "RESOLVED", label: "Resolved" },
    { value: "REJECTED", label: "Rejected" },
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:flex-wrap items-start lg:items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 rounded-2xl">
      {/* Status Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full lg:w-auto">
        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
          Status:
        </span>
        <div className="bg-white p-2 md:p-3 rounded-2xl border border-gray-200 shadow-sm flex flex-wrap gap-1.5">
          {statusOptions.map((status) => (
            <button
              key={status.value}
              type="button"
              onClick={() => onStatusChange(status.value)}
              className={`px-3 md:px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
                statusFilter === status.value
                  ? "btn-primary shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full lg:w-auto">
        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
          Date Range:
        </span>
        <Select defaultValue="this-month">
          <SelectTrigger className="w-full sm:w-40 text-xs bg-white border-gray-200 shadow-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="last-3-months">Last 3 Months</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Export Button */}
      {onExport && (
        <button
          type="button"
          onClick={onExport}
          className="w-full lg:w-auto lg:ml-auto px-4 py-2 btn-primary text-sm font-medium rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all"
        >
          <span>Export</span>
          <Download className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default FilterBar;
