/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column, DataTable } from "@/components/Shared/DataTable/DataTable";
import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";
import NoDataFound from "@/components/Shared/NoDataFound/NoDataFound";
import { useGetTopSellersQuery } from "@/redux/features/dashboard/dashboardApi";
import { useState } from "react";
import { useSelector } from "react-redux";

interface SellerData {
  username: string;
  dealsCompleted30d: number;
  totalRevenue30d: number;
  avgOrderValue: number;
}

export const TopSellers = () => {
  const searchTerm = useSelector(
    (state: any) => state.search?.searchTerm || ""
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { data, isLoading, error } = useGetTopSellersQuery({
    page: currentPage,
    limit: itemsPerPage,
    search: searchTerm,
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
      header: "Deals Completed (30d)",
      accessor: "dealsCompleted30d",
    },
    {
      header: "Total Revenue (30d)",
      accessor: "totalRevenue30d",
      hideOnMobile: true,
      render: (item) =>
        `$${
          item.totalRevenue30d
            ? Number((item.totalRevenue30d / 100).toFixed(2))
            : 0
        }`,
    },
    {
      header: "Avg Order Value",
      accessor: "avgOrderValue",
      hideOnMobile: true,
      render: (item) =>
        `$${
          item.avgOrderValue ? Number((item.avgOrderValue / 100).toFixed(2)) : 0
        }`,
    },
  ];

  if (isLoading) return <LoadingSpinner />;
  if (error) return <NoDataFound dataTitle="top sellers" />;
  if (sellers.length === 0) return <NoDataFound dataTitle="top sellers Data" />;

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
