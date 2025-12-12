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

const PaymentFilterBar = ({ statusFilter, onStatusChange, onExport }: FilterBarProps) => {
  return (
    <div className="flex flex-col lg:flex-row lg:flex-wrap items-start lg:items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg">
      {/* Type Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full lg:w-auto">
        <span className="text-sm font-medium whitespace-nowrap">Type:</span>
        <div className="bg-white p-2 md:p-3 rounded-2xl border flex flex-wrap gap-1">
          <button className="px-2 md:px-3 py-1.5 text-xs font-medium btn-primary rounded">
            All
          </button>
          <button className="px-2 md:px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded">
            Payment
          </button>
          <button className="px-2 md:px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded">
            Refund
          </button>
          <button className="px-2 md:px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded">
            Payout
          </button>
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full lg:w-auto">
        <span className="text-sm font-medium whitespace-nowrap">Status:</span>
        <div className="bg-white p-2 md:p-3 rounded-2xl border flex flex-wrap gap-1">
          <button
            onClick={() => onStatusChange("all")}
            className={`px-2 md:px-3 py-1.5 text-xs font-medium rounded ${
              statusFilter === "all" ? "btn-primary" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            All
          </button>
          <button
            onClick={() => onStatusChange("Active")}
            className={`px-2 md:px-3 py-1.5 text-xs font-medium rounded ${
              statusFilter === "Active" ? "btn-primary" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => onStatusChange("Pending")}
            className={`px-2 md:px-3 py-1.5 text-xs font-medium rounded ${
              statusFilter === "Pending" ? "btn-primary" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => onStatusChange("Resolved")}
            className={`px-2 md:px-3 py-1.5 text-xs font-medium rounded ${
              statusFilter === "Resolved" ? "btn-primary" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Date Range */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full lg:w-auto">
        <span className="text-sm font-medium whitespace-nowrap">Date Range:</span>
        <Select defaultValue="this-month">
          <SelectTrigger className="w-full sm:w-[140px] text-xs bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="last-3-months">Last 3 Months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Export Button */}
      <button
        onClick={onExport}
        className="w-full lg:w-auto lg:ml-auto px-4 py-2 btn-primary text-sm font-medium rounded flex items-center justify-center gap-2"
      >
        <span>Export</span>
        <Download className="w-4 h-4" />
      </button>
    </div>
  );
};

export default PaymentFilterBar;
