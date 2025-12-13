import { Column, DataTable } from "@/components/Shared/DataTable/DataTable";
import { useGetTopSellersQuery } from "@/redux/features/dashboard/dashboardApi";
import { useState } from "react";

interface SellerData {
  username: string;
  dealsCompleted30d: number;
  totalRevenue30d: number;
  avgOrderValue: number;
}

export const TopSellers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { data, isLoading, error } = useGetTopSellersQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const sellers: SellerData[] = data?.data?.data || [];
  const pagination = data?.data?.pagination;

  const columns: Column<SellerData>[] = [
    {
      header: "Username",
      accessor: "username",
      render: (item) => (
        <span className="font-medium text-gray-800">{item.username}</span>
      ),
    },
    {
      header: "Deals (30d)",
      accessor: "dealsCompleted30d",
    },
    {
      header: "Revenue (30d)",
      accessor: "totalRevenue30d",
      hideOnMobile: true,
      render: (item) => `$${item.totalRevenue30d.toFixed(2)}`,
    },
    {
      header: "Avg Order",
      accessor: "avgOrderValue",
      hideOnMobile: true,
      render: (item) => `$${item.avgOrderValue.toFixed(2)}`,
    }
  ];

  if (isLoading)
    return (
      <div className="p-3 sm:p-4 text-center text-gray-500">
        Loading Top Sellers...
      </div>
    );
  if (error)
    return (
      <div className="p-3 sm:p-4 text-center text-red-500">
        Error loading top sellers data.
      </div>
    );
  if (sellers.length === 0)
    return (
      <div className="p-3 sm:p-4 text-center text-gray-500">No top sellers found.</div>
    );

  return (
    <DataTable
      title="Top Sellers"
      columns={columns}
      data={sellers}
      getRowKey={(item) => item.username}
      showPagination={true}
      currentPage={currentPage}
      totalItems={pagination?.total || 0}
      itemsPerPage={itemsPerPage}
      onPageChange={setCurrentPage}
    />
  );
};
