/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column, DataTable } from "@/components/Shared/DataTable/DataTable";
import { useState } from "react";
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

interface Dispute {
  id: string;
  caseId: string;
  orderId: string;
  disputedBy: string;
  status: string;
  submittedDate: string;
}

const Disputes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
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

      console.log("Sending Payload:", payload);

      await updateStatus(payload).unwrap();
      alert("Update Success!");
    } catch (err: any) {
      console.error("Full Error Object:", err);
      const serverMessage = err?.data?.message || "Permission Denied!";
      // alert(`Error: ${serverMessage}`);
      toast.error(`Error: ${serverMessage}`);
    }
  };

  const transformedData: Dispute[] = (data || []).map(
    (item: DisputeResponse) => ({
      id: item.id,
      caseId: item.order.orderCode,
      orderId: item.order.orderCode,
      disputedBy: item.user.full_name,
      status: item.status,
      submittedDate: new Date(item.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    })
  );

  const filteredData = transformedData.filter((item) =>
    statusFilter === "all" ? true : item.status === statusFilter.toUpperCase()
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns: Column<Dispute>[] = [
    { header: "Case ID", accessor: "caseId" },
    { header: "Order ID", accessor: "orderId", hideOnMobile: true },
    { header: "Disputed by", accessor: "disputedBy" },
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
            className="text-gray-600 hover:text-red-600 font-medium text-xs sm:text-sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/disputes/${item.id}`);
            }}
          >
            View
          </button>
          <span className="text-gray-300">/</span>
          <button
            type="button"
            className="text-emerald-600 hover:text-emerald-700 font-medium text-xs sm:text-sm disabled:opacity-30"
            disabled={item.status === "RESOLVED" || item.status === "REJECTED"}
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

  if (isLoading)
    return <div className="p-10 text-center">Loading Disputes...</div>;
  if (error) return <NoDataFound dataTitle="Disputes Data" />;

  return (
    <div className="space-y-6">
      <PageHeading title="Disputes" />
      <FilterBar statusFilter={statusFilter} onStatusChange={setStatusFilter} />
      <DataTable
        columns={columns}
        data={paginatedData}
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
