import { Column, DataTable } from "@/components/Shared/DataTable/DataTable";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeading from "@/components/Shared/PageHeading/PageHeading";
import { useGetDisputesQuery } from "@/redux/features/disputes/disputesApi";
import FilterBar from "./components/FilterBar";
import { saveAs } from "file-saver";

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

  const transformedData: Dispute[] = (data || []).map((item) => ({
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
  }));

  const filteredData = transformedData.filter((item) =>
    statusFilter === "all" ? true : item.status === statusFilter.toUpperCase()
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExport = () => {
    const header = [
      "Case ID",
      "Order ID",
      "Disputed By",
      "Status",
      "Submitted Date",
    ];
    const body = filteredData.map((item) =>
      [
        item.caseId,
        item.orderId,
        item.disputedBy,
        item.status,
        item.submittedDate,
      ].join(",")
    );
    const csv = [header.join(","), ...body].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `disputes_${new Date().toISOString().slice(0, 10)}.csv`);
  };

  const columns: Column<Dispute>[] = [
    { header: "Case ID", accessor: "caseId" },
    { header: "Order ID", accessor: "orderId", hideOnMobile: true },
    { header: "Disputed by", accessor: "disputedBy" },
    {
      header: "Status",
      accessor: "status",
      render: (item) => (
        <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium bg-gray-100">
          {item.status}
        </span>
      ),
    },
    { header: "Date", accessor: "submittedDate", hideOnMobile: true },
    {
      header: "Action",
      render: (item) => (
        <button
          className="px-2 sm:px-3 py-1 text-xs sm:text-sm hover:underline text-gray-700"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/disputes/${item.id}`);
          }}
        >
          View
        </button>
      ),
    },
  ];

  if (isLoading) return <div className="p-4 md:p-6">Loading...</div>;
  if (error) return <div className="p-4 md:p-6">Error loading disputes</div>;

  return (
    <div className="space-y-6">
      <PageHeading title="Disputes" />

      <FilterBar
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        onExport={handleExport}
      />

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
