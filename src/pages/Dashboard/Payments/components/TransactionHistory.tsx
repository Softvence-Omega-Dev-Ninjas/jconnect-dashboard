import { Column, DataTable } from "@/components/Shared/DataTable/DataTable";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeading from "@/components/Shared/PageHeading/PageHeading";
import { saveAs } from "file-saver";
import PaymentFilterBar from "./PementFilterBar";

interface Payment {
  id: string;
  orderId: string;
  sellerUsername: string;
  amount: number;
  netSeller: number;
  paymentType: string;
  status: string;
  date: string;
}

// Dummy Data
const dummyTransactionData: Payment[] = [
  {
    id: "dispute_001",
    orderId: "#DJCX29381",
    sellerUsername: "@djnovax",
    amount: 100.0,
    netSeller: 90.0,
    paymentType: "Payment",
    status: "Completed",
    date: "Oct 20, 2025",
  },
  {
    id: "dispute_002",
    orderId: "#DJCX29381",
    sellerUsername: "@djnovax",
    amount: 100.0,
    netSeller: 90.0,
    paymentType: "Payment",
    status: "Completed",
    date: "Oct 20, 2025",
  },
  {
    id: "dispute_003",
    orderId: "#DJCX29381",
    sellerUsername: "@djnovax",
    amount: 100.0,
    netSeller: 90.0,
    paymentType: "Refund",
    status: "Refunded",
    date: "Oct 20, 2025",
  },
  {
    id: "dispute_004",
    orderId: "#DJCX29381",
    sellerUsername: "@djnovax",
    amount: 100.0,
    netSeller: 90.0,
    paymentType: "Payment",
    status: "Completed",
    date: "Oct 20, 2025",
  },
  {
    id: "dispute_005",
    orderId: "#DJCX29381",
    sellerUsername: "@djnovax",
    amount: 100.0,
    netSeller: 90.0,
    paymentType: "Refund",
    status: "Refunded",
    date: "Oct 20, 2025",
  },
  {
    id: "dispute_006",
    orderId: "#DJCX29381",
    sellerUsername: "@djnovax",
    amount: 100.0,
    netSeller: 90.0,
    paymentType: "Payout",
    status: "Released",
    date: "Oct 20, 2025",
  },
  {
    id: "dispute_007",
    orderId: "#DJCX29381",
    sellerUsername: "@djnovax",
    amount: 100.0,
    netSeller: 90.0,
    paymentType: "Payment",
    status: "Completed",
    date: "Oct 20, 2025",
  },
  {
    id: "dispute_008",
    orderId: "#DJCX29381",
    sellerUsername: "@djnovax",
    amount: 100.0,
    netSeller: 90.0,
    paymentType: "Payout",
    status: "Hold",
    date: "Oct 20, 2025",
  },
  {
    id: "dispute_009",
    orderId: "#DJCX29381",
    sellerUsername: "@djnovax",
    amount: 100.0,
    netSeller: 90.0,
    paymentType: "Payment",
    status: "Completed",
    date: "Oct 20, 2025",
  },
  // --- 6 NEW ENTRIES ADDED BELOW ---
  {
    id: "dispute_010",
    orderId: "#DJCX29382",
    sellerUsername: "@djnovax",
    amount: 150.5,
    netSeller: 135.45,
    paymentType: "Payment",
    status: "Completed",
    date: "Oct 21, 2025",
  },
  {
    id: "dispute_011",
    orderId: "#DJCX29382",
    sellerUsername: "@djnovax",
    amount: 25.0,
    netSeller: 22.5,
    paymentType: "Refund",
    status: "Refunded",
    date: "Oct 21, 2025",
  },
  {
    id: "dispute_012",
    orderId: "#DJCX29383",
    sellerUsername: "@djnovax",
    amount: 450.0,
    netSeller: 405.0,
    paymentType: "Payout",
    status: "Released",
    date: "Oct 22, 2025",
  },
  {
    id: "dispute_013",
    orderId: "#DJCX29384",
    sellerUsername: "@djnovax",
    amount: 75.99,
    netSeller: 68.39,
    paymentType: "Payment",
    status: "Completed",
    date: "Oct 23, 2025",
  },
  {
    id: "dispute_014",
    orderId: "#DJCX29384",
    sellerUsername: "@djnovax",
    amount: 75.99,
    netSeller: 68.39,
    paymentType: "Payout",
    status: "Hold",
    date: "Oct 23, 2025",
  },
  {
    id: "dispute_015",
    orderId: "#DJCX29385",
    sellerUsername: "@djnovax",
    amount: 320.0,
    netSeller: 288.0,
    paymentType: "Payment",
    status: "Completed",
    date: "Oct 24, 2025",
  },
];

const TransactionHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();
  const itemsPerPage = 9;

  const data = dummyTransactionData;

  const transformedData: Payment[] = (data || []).map((item) => ({
    id: item.id,
    orderId: item.orderId,
    sellerUsername: item.sellerUsername,
    amount: item.amount,
    netSeller: item.netSeller,
    paymentType: item.paymentType,
    status: item.status,
    date: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  }));

  const filteredData = transformedData.filter((item) =>
    statusFilter === "all" ? true : item.status.toLowerCase() === statusFilter.toLowerCase()
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExport = () => {
    const header = [
      "Order ID",
      "Seller Username",
      "Amount",
      "Net Seller",
      "Payment Type",
      "Status",
      "Date",
    ];
    const body = filteredData.map((item) =>
      [
        item.orderId,
        item.sellerUsername,
        item.amount,
        item.netSeller,
        item.paymentType,
        item.status,
        item.date,
      ].join(",")
    );
    const csv = [header.join(","), ...body].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `payments_${new Date().toISOString().slice(0, 10)}.csv`);
  };

  const columns: Column<Payment>[] = [
    { header: "Order ID", accessor: "orderId" },
    { header: "Seller Username", accessor: "sellerUsername" },
    { header: "Amount", accessor: "amount" },
    { header: "Net Seller", accessor: "netSeller" },
    { header: "Payment Type", accessor: "paymentType" },
    {
      header: "Status",
      accessor: "status",
      render: (item) => (
        <span className="px-3 py-1 rounded-full text-xs font-medium">
          {item.status}
        </span>
      ),
    },
    { header: " Date", accessor: "date" },
    {
      header: "Action",
      render: (item) => (
        <button
          className="px-3 py-1 text-sm hover:underline text-gray-700"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/payments/${item.id}`);
          }}
        >
          View
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeading title="Transaction History" />

      <PaymentFilterBar
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

export default TransactionHistory;
