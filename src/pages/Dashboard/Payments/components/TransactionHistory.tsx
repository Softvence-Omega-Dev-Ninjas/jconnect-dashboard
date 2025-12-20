/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column, DataTable } from "@/components/Shared/DataTable/DataTable";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import { Search } from "lucide-react";
import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";
import ApiErrorMessage from "@/components/Shared/ApiErrorMessage/ApiErrorMessage";
import {
  TransactionHistoryQueryParams,
  useGetAllTransactionHistoryQuery,
} from "@/redux/features/payment/paymentApi";
import { DisplayPayment, Payment } from "@/types/TransactionHistory.type";
import StatusBadge from "@/components/Shared/StatusBadge/StatusBadge";
import PaymentFilterBar from "./PementFilterBar";
import { useSelector } from "react-redux";

const ITEMS_PER_PAGE = 10;
const getMonthLabel = (monthValue: string) => {
  return monthValue === "all" ? "Selected Month" : monthValue;
};

const TransactionHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const searchTerm = useSelector(
    (state: any) => state.search?.searchTerm || ""
  );

  const navigate = useNavigate();

  const queryParams: TransactionHistoryQueryParams = useMemo(() => {
    return {
      page: currentPage,
      limit: ITEMS_PER_PAGE,
      status: statusFilter === "all" ? undefined : statusFilter,
      month:
        monthFilter === "all" ? undefined : (monthFilter as unknown as number),

      sort: sortOrder as "asc" | "desc",
      searchTerm: searchTerm,
    };
  }, [currentPage, statusFilter, monthFilter, sortOrder, searchTerm]);

  const { data, isLoading, isFetching, error, refetch } =
    useGetAllTransactionHistoryQuery(queryParams);

  const totalItems = data?.meta?.total || 0;

  const transformedData: DisplayPayment[] = useMemo(() => {
    const transactionData: Payment[] = (data?.data as Payment[]) || [];

    return transactionData.map((item) => ({
      id: item.id,
      orderCode: item.orderCode,
      amount: item.amount,
      netSeller: item.seller_amount,
      PlatfromRevinue: item.PlatfromRevinue,
      status: item.status,
      sellerUsername: item.seller?.full_name || "N/A",
      date: new Date(item.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }));
  }, [data]);

  const handleExport = () => {
    const exportData = transformedData;

    const header = [
      "Order Code",
      "Seller Name",
      "Gross Amount",
      "Net Seller",
      "Platform Revenue",
      "Status",
      "Date",
    ];
    const body = exportData.map((item) =>
      [
        item.orderCode,
        item.sellerUsername,
        item.amount,
        item.netSeller,
        item.PlatfromRevinue,
        item.status,
        item.date,
      ].join(",")
    );
    const csv = [header.join(","), ...body].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `payments_${new Date().toISOString().slice(0, 10)}.csv`);
  };

  const STATUS_COLOR_MAP = {
    RELEASED: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    IN_PROGRESS: "bg-yellow-100 text-yellow-700",
    CANCELLED: "bg-red-100 text-red-700",
    PROCESSING: "bg-blue-100 text-blue-700",
  };

  const columns: Column<DisplayPayment>[] = [
    { header: "Order Code", accessor: "orderCode" },
    { header: "Seller", accessor: "sellerUsername", hideOnMobile: true },
    {
      header: "Amount",
      accessor: "amount",
      render: (item) => `$${item.amount.toFixed(2)}`,
    },
    {
      header: "Net",
      accessor: "netSeller",
      hideOnMobile: true,
      render: (item) => `$${item.netSeller.toFixed(2)}`,
    },
    {
      header: "Status",
      accessor: "status",
      render: (item) => (
        <StatusBadge
          status={item.status}
          colorMap={STATUS_COLOR_MAP}
          fallbackColor="bg-gray-100 text-gray-700"
        />
      ),
    },
    { header: "Date", accessor: "date", hideOnMobile: true },
    {
      header: "Action",
      render: (item) => (
        <button
          className="px-2 sm:px-3 py-1 text-xs sm:text-sm hover:underline text-red-600"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/payment/${item.id}`);
          }}
        >
          View
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-3 mt-15">
      <div className="">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
          Transaction History
        </h1>
      </div>

      <PaymentFilterBar
        statusFilter={statusFilter}
        onStatusChange={(status) => {
          setStatusFilter(status);
          setCurrentPage(1);
        }}
        monthFilter={monthFilter}
        onMonthChange={(month) => {
          setMonthFilter(month);
          setCurrentPage(1);
        }}
        sortOrder={sortOrder}
        onSortChange={(order) => {
          setSortOrder(order);
          setCurrentPage(1);
        }}
        onExport={handleExport}
      />

      {isLoading || isFetching ? (
        <div className="flex justify-center items-center h-48">
          <LoadingSpinner />
          <p className="ml-2 text-gray-600">Loading transactions...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <ApiErrorMessage
            error={error}
            fallbackMessage={`Failed to load transaction history. Please check your network or backend support for month filtering.`}
            className="text-red-500"
          />
          <button
            onClick={refetch}
            className="mt-4 text-blue-600 hover:underline"
          >
            Try Refetching
          </button>
        </div>
      ) : transformedData.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <Search className="w-8 h-8 mx-auto mb-2" />
          {statusFilter !== "all" || monthFilter !== "all" ? (
            <>
              <p className="text-base font-semibold">
                No transactions found matching your criteria.
              </p>

              {statusFilter !== "all" && (
                <p className="text-base font-semibold mt-2">
                  {statusFilter} has no data.
                </p>
              )}

              {monthFilter !== "all" && (
                <p className="text-base font-semibold mt-2">
                  {getMonthLabel(monthFilter)} Month has no data.
                </p>
              )}
            </>
          ) : (
            <p>
              No transactions found. Start by filtering or checking your data
              source.
            </p>
          )}
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={transformedData}
          getRowKey={(item) => item.id}
          showPagination={true}
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default TransactionHistory;
