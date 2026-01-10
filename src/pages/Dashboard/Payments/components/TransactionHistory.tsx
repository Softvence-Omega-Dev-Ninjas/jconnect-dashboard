/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column, DataTable } from "@/components/Shared/DataTable/DataTable";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import { Search } from "lucide-react";
import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";
import ApiErrorMessage from "@/components/Shared/ApiErrorMessage/ApiErrorMessage";
import {
  TransactionHistoryQueryParams,
  useGetAllTransactionHistoryQuery,
  useRefundPaymentMutation,
} from "@/redux/features/payment/paymentApi";
import { DisplayPayment, Payment } from "@/types/TransactionHistory.type";
import StatusBadge from "@/components/Shared/StatusBadge/StatusBadge";
import PaymentFilterBar from "./PementFilterBar";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "sonner";

const getMonthLabel = (monthValue: string) => {
  return monthValue === "all" ? "Selected Month" : monthValue;
};

const TransactionHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const searchTerm = useSelector(
    (state: any) => state.search?.searchTerm || ""
  );

  const navigate = useNavigate();

  const queryParams: TransactionHistoryQueryParams = useMemo(() => {
    return {
      page: currentPage,
      limit: itemsPerPage,
      status: statusFilter === "all" ? undefined : statusFilter,
      month:
        monthFilter === "all" ? undefined : (monthFilter as unknown as number),

      sortOrder: sortOrder,
      searchTerm: searchTerm,
    };
  }, [currentPage, statusFilter, monthFilter, sortOrder, searchTerm, itemsPerPage]);

  const { data, isLoading, isFetching, error, refetch } =
    useGetAllTransactionHistoryQuery(queryParams);
  const [refundPayment, { isLoading: isRefunding }] = useRefundPaymentMutation();

  useEffect(() => {
    refetch();
  }, [sortOrder, refetch]);

  const handleRefund = async (paymentId: string, orderCode: string) => {
    const result = await Swal.fire({
      title: "Confirm Refund?",
      text: `Are you sure you want to refund payment for order ${orderCode}? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#BD001F",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Refund",
      cancelButtonText: "Cancel",
      heightAuto: false,
      customClass: {
        popup: "rounded-3xl",
      },
    });

    if (result.isConfirmed) {
      try {
        const loadingToast = toast.loading("Processing refund...");

        await refundPayment(paymentId).unwrap();

        toast.dismiss(loadingToast);
        toast.success("Refund processed successfully! Status updated to CANCELLED.");

        // Refetch the data to update the status
        refetch();
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to process refund. Please try again.");
      }
    }
  };

  const totalItems = data?.meta?.total || 0;

  const transformedData: DisplayPayment[] = useMemo(() => {
    const transactionData: Payment[] = (data?.data as Payment[]) || [];

    return transactionData.map((item) => ({
      id: item.id,
      orderid: item.orderCode,
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
      "Order ID",
      "Seller Username",
      "Gross Amount",
      "Net to Seller",
      "Platform Revenue",
      "Status",
      "Date",
    ];
    const body = exportData.map((item) =>
      [
        item.orderid,
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
    PROOF_SUBMITTED: "bg-purple-100 text-purple-700",
  };

  const columns: Column<DisplayPayment>[] = [
    { header: "Order ID", accessor: "orderid" },
    {
      header: "Seller Username",
      accessor: "sellerUsername",
      hideOnMobile: true,
    },
    {
      header: "Amount",
      accessor: "amount",
      render: (item) =>
        `$${item.amount ? Number((item.amount / 100).toFixed(2)) : 0}`,
    },
    {
      header: "Net to Seller",
      accessor: "netSeller",
      hideOnMobile: true,
      render: (item) =>
        `$${item.netSeller ? Number((item.netSeller / 100).toFixed(2)) : 0}`,
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
        <div className="flex items-center gap-2 justify-center">
          <button
            className="px-1 py-1 text-xs sm:text-sm hover:underline text-red-600"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/payment/${item.id}`);
            }}
          >
            View
          </button>
          {item.status !== "CANCELLED" && (
            <>
              <span>/</span>
              <button
                className="px-1 py-1 text-xs sm:text-sm hover:underline text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRefund(item.id, item.orderid);
                }}
                disabled={isRefunding}
              >
                {isRefunding ? "Processing..." : "Refund"}
              </button>
            </>
          )}
        </div>
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
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          setItemsPerPage={setItemsPerPage}
        />
      )}
    </div>
  );
};

export default TransactionHistory;
