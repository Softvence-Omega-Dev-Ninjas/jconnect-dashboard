/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column, DataTable } from "@/components/Shared/DataTable/DataTable";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PageHeading from "@/components/Shared/PageHeading/PageHeading";
import {
  useGetDisputesQuery,
  useUpdateDisputeStatusMutation,
  DisputeResponse,
} from "@/redux/features/disputes/disputesApi";
import FilterBar from "./components/FilterBar";
import NoDataFound from "@/components/Shared/NoDataFound/NoDataFound";
import { toast } from "sonner";
import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";

interface Dispute {
  id: string;
  caseId: string;
  orderId: string;
  disputedBy: string;
  status: string;
  submittedDate: string;
  rawDate: Date;
}

const Disputes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().getMonth().toString()
  );

  const navigate = useNavigate();
  const itemsPerPage = 9;

  const { data, isLoading, error } = useGetDisputesQuery();
  const [updateStatus] = useUpdateDisputeStatusMutation();

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const payload = {
        id,
        status: newStatus,
        resolution:
          newStatus === "RESOLVED"
            ? "The dispute has been reviewed and resolved by the administrator."
            : "The dispute has been rejected after review.",
      };
      await updateStatus(payload).unwrap();
      toast.success("Update Success!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Permission Denied!");
    }
  };

  const filteredData = useMemo(() => {
    if (!data) return [];
    return (data as DisputeResponse[])
      .map((item) => ({
        id: item.id,
        caseId: item.order.orderCode,
        orderId: item.order.orderCode,
        disputedBy: item.user.full_name,
        status: item.status,
        rawDate: new Date(item.createdAt),
        submittedDate: new Date(item.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      }))
      .filter((item) => {
        const matchesStatus =
          statusFilter === "all"
            ? true
            : item.status === statusFilter.toUpperCase();
        const matchesMonth =
          item.rawDate.getMonth().toString() === selectedMonth;
        return matchesStatus && matchesMonth;
      });
  }, [data, statusFilter, selectedMonth]);

  const handleExport = () => {
    if (filteredData.length === 0) {
      toast.error("No data found to export.");
      return;
    }
    const headers = "Case ID,Order ID,Disputed By,Status,Submitted Date\n";
    const rows = filteredData
      .map(
        (item) =>
          `${item.caseId},${item.orderId},${item.disputedBy},${item.status},${item.submittedDate}`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Disputes_Report.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const columns: Column<Dispute>[] = [
    { header: "Case ID", accessor: "caseId" },
    { header: "Order ID", accessor: "orderId", hideOnMobile: true },
    { header: "Disputed by", accessor: "disputedBy" },
    { header: "Submitted Date", accessor: "submittedDate" },
    {
      header: "Status",
      accessor: "status",
      render: (item) => (
        <span
          className={`px-2 py-1 rounded-full text-[10px] font-bold ${
            item.status === "RESOLVED"
              ? "bg-green-100 text-green-700"
              : item.status === "REJECTED"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      header: "Action",
      render: (item) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="text-gray-600 hover:text-red-600 text-sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/disputes/${item.id}`);
            }}
          >
            View
          </button>
          <span>/</span>
          <button
            type="button"
            disabled={item.status !== "UNDER_REVIEW"}
            className="text-emerald-600 disabled:opacity-30 text-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleStatusUpdate(item.id, "RESOLVED");
            }}
          >
            Resolve
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    return <NoDataFound dataTitle="Disputes Data" />;
  }

  return (
    <div className="space-y-6">
      <PageHeading title="Disputes" />
      <FilterBar
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        onExport={handleExport}
      />

      <DataTable
        columns={columns}
        data={filteredData.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )}
        getRowKey={(item) => item.id}
        showPagination={true}
        currentPage={currentPage}
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Disputes;
