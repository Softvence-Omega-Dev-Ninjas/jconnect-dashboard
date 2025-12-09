import { Column, DataTable } from "@/components/Shared/DataTable/DataTable";
import { useState } from "react";
import { Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageHeading from "@/components/Shared/PageHeading/PageHeading";

export interface Dispute {
  caseId: string;
  orderId: string;
  disputedBy: string;
  status: "Pending" | "Under Review" | "Resolved";
  submittedDate: string;
  action: string;
}

const Disputes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const disputesData: Dispute[] = [
    {
      caseId: "Disp#088",
      orderId: "#DJCX29381",
      disputedBy: "@djnovax",
      status: "Pending",
      submittedDate: "Oct 20, 2025",
      action: "View",
    },
    {
      caseId: "Disp#088",
      orderId: "#DJCX29381",
      disputedBy: "@djnovax",
      status: "Under Review",
      submittedDate: "Oct 20, 2025",
      action: "View Resolve",
    },
    {
      caseId: "Disp#088",
      orderId: "#DJCX29381",
      disputedBy: "@djnovax",
      status: "Pending",
      submittedDate: "Oct 20, 2025",
      action: "View",
    },
    {
      caseId: "Disp#088",
      orderId: "#DJCX29381",
      disputedBy: "@djnovax",
      status: "Under Review",
      submittedDate: "Oct 20, 2025",
      action: "View Resolve",
    },
    {
      caseId: "Disp#088",
      orderId: "#DJCX29381",
      disputedBy: "@djnovax",
      status: "Pending",
      submittedDate: "Oct 20, 2025",
      action: "View",
    },
    {
      caseId: "Disp#088",
      orderId: "#DJCX29381",
      disputedBy: "@djnovax",
      status: "Under Review",
      submittedDate: "Oct 20, 2025",
      action: "View Resolve",
    },
    {
      caseId: "Disp#088",
      orderId: "#DJCX29381",
      disputedBy: "@djnovax",
      status: "Resolved",
      submittedDate: "Oct 20, 2025",
      action: "View",
    },
    {
      caseId: "Disp#088",
      orderId: "#DJCX29381",
      disputedBy: "@djnovax",
      status: "Resolved",
      submittedDate: "Oct 20, 2025",
      action: "View",
    },
    {
      caseId: "Disp#088",
      orderId: "#DJCX29381",
      disputedBy: "@djnovax",
      status: "Resolved",
      submittedDate: "Oct 20, 2025",
      action: "View",
    },
  ];

  const columns: Column<Dispute>[] = [
    {
      header: "Case ID",
      accessor: "caseId",
    },
    {
      header: "Order ID",
      accessor: "orderId",
    },
    {
      header: "Disputed by",
      accessor: "disputedBy",
    },
    {
      header: "Status",
      accessor: "status",
      render: (item) => {
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium ">
            {item.status}
          </span>
        );
      },
    },
    {
      header: "Submitted Date",
      accessor: "submittedDate",
    },
    {
      header: "Action",
      render: (item) => (
        <div className="flex gap-2">
          {item.action.split(" ").map((action, idx) => (
            <button
              key={idx}
              className="px-3 py-1 text-sm hover:underline text-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                if (action === "View") {
                  navigate(`/disputes/${item.caseId}`);
                }
              }}
            >
              {action}
            </button>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeading title="Disputes" />

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-4  p-4 rounded-lg">
        {/* Priority Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Priority:</span>
          <div className="bg-white p-3 rounded-2xl">
            <button className="px-3 py-1.5 text-xs font-medium btn-primary rounded">
              All
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded">
              High
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded">
              Medium
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded">
              Low
            </button>
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 ">
          <span className="text-sm font-medium">Status:</span>
          <div className="bg-white p-3 rounded-2xl">
            <button className="px-3 py-1.5 text-xs font-medium bg-[#BD001F] text-white rounded">
              All
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded">
              Pending
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded">
              Under Review
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded">
              Resolved
            </button>
          </div>
        </div>

        {/* Date Range */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Date Range:</span>
          <Select defaultValue="this-month">
            <SelectTrigger className="w-[140px] h-9 text-xs bg-white rounded-2xl">
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
        <button className="ml-auto px-4 py-2 bg-[#BD001F] text-white text-sm font-medium rounded hover:bg-[#8A0013] flex items-center gap-2">
          <span>Export</span>
          <Download className="w-4 h-4" />
        </button>
      </div>

      <DataTable
        columns={columns}
        data={disputesData}
        getRowKey={(item) => `${item.caseId}-${item.orderId}-${item.status}`}
        showPagination={true}
        currentPage={currentPage}
        totalItems={50}
        itemsPerPage={9}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Disputes;
