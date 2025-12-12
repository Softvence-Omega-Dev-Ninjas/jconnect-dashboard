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

// Dummy Data (Matching the final Payment interface)
const dummyTransactionData: Payment[] = [
    { id: "dispute_001", orderId: "ORD-98765", sellerUsername: "alice_seller", amount: 150.75, netSeller: 135.68, paymentType: "CREDIT_CARD", status: "RESOLVED", date: "Dec 10, 2025" },
    { id: "dispute_002", orderId: "ORD-54321", sellerUsername: "bob_electronics", amount: 550.00, netSeller: 495.00, paymentType: "PAYPAL", status: "PENDING", date: "Dec 08, 2025" },
    { id: "dispute_003", orderId: "ORD-11223", sellerUsername: "charlie_books", amount: 25.50, netSeller: 22.95, paymentType: "STRIPE", status: "REJECTED", date: "Dec 05, 2025" },
    { id: "dispute_004", orderId: "ORD-44556", sellerUsername: "diana_fashion", amount: 89.99, netSeller: 80.99, paymentType: "CREDIT_CARD", status: "RESOLVED", date: "Dec 01, 2025" },
    { id: "dispute_005", orderId: "ORD-77889", sellerUsername: "eve_art", amount: 300.00, netSeller: 270.00, paymentType: "PAYPAL", status: "PENDING", date: "Nov 28, 2025" },
    { id: "dispute_006", orderId: "ORD-65432", sellerUsername: "frank_tools", amount: 45.00, netSeller: 40.50, paymentType: "STRIPE", status: "RESOLVED", date: "Nov 25, 2025" },
    { id: "dispute_007", orderId: "ORD-12345", sellerUsername: "grace_jewelry", amount: 1200.00, netSeller: 1080.00, paymentType: "BANK_TRANSFER", status: "PENDING", date: "Nov 20, 2025" },
    { id: "dispute_009", orderId: "ORD-00112", sellerUsername: "irene_food", amount: 65.20, netSeller: 58.68, paymentType: "PAYPAL", status: "RESOLVED", date: "Nov 12, 2025" },
    { id: "dispute_008", orderId: "ORD-99900", sellerUsername: "henry_games", amount: 14.99, netSeller: 13.49, paymentType: "CREDIT_CARD", status: "REJECTED", date: "Nov 15, 2025" },
    { id: "dispute_008", orderId: "ORD-99900", sellerUsername: "henry_games", amount: 14.99, netSeller: 13.49, paymentType: "CREDIT_CARD", status: "REJECTED", date: "Nov 15, 2025" },
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
    statusFilter === "all" ? true : item.status === statusFilter.toUpperCase()
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
    saveAs(blob, `disputes_${new Date().toISOString().slice(0, 10)}.csv`);
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