import { Column, DataTable } from "@/components/Shared/DataTable/DataTable";
import { useState } from "react";

interface Seller {
  username: string;
  dealsCompleted: number;
  totalRevenue: string;
  avgOrderValue: string;
}

const sellers: Seller[] = [
  { username: "@djnovax", dealsCompleted: 20, totalRevenue: "$32000", avgOrderValue: "$100" },
  { username: "@sarahsmith", dealsCompleted: 18, totalRevenue: "$28500", avgOrderValue: "$95" },
  { username: "@techguru99", dealsCompleted: 22, totalRevenue: "$35200", avgOrderValue: "$110" },
  { username: "@creativemind", dealsCompleted: 15, totalRevenue: "$24000", avgOrderValue: "$88" },
  { username: "@marketer_pro", dealsCompleted: 25, totalRevenue: "$40000", avgOrderValue: "$120" },
  { username: "@designwhiz", dealsCompleted: 19, totalRevenue: "$30400", avgOrderValue: "$102" },
  { username: "@codemaster", dealsCompleted: 21, totalRevenue: "$33600", avgOrderValue: "$105" },
  { username: "@salesking", dealsCompleted: 28, totalRevenue: "$44800", avgOrderValue: "$125" },
  { username: "@digitalexpert", dealsCompleted: 17, totalRevenue: "$27200", avgOrderValue: "$92" },
  { username: "@businesspro", dealsCompleted: 23, totalRevenue: "$36800", avgOrderValue: "$115" },
  { username: "@marketqueen", dealsCompleted: 16, totalRevenue: "$25600", avgOrderValue: "$90" },
  { username: "@webdeveloper", dealsCompleted: 20, totalRevenue: "$32000", avgOrderValue: "$100" },
  { username: "@contentcreator", dealsCompleted: 14, totalRevenue: "$22400", avgOrderValue: "$85" },
  { username: "@strategyexpert", dealsCompleted: 24, totalRevenue: "$38400", avgOrderValue: "$118" },
  { username: "@entrepreneur", dealsCompleted: 19, totalRevenue: "$30400", avgOrderValue: "$102" },
  { username: "@innovator_x", dealsCompleted: 21, totalRevenue: "$33600", avgOrderValue: "$105" },
  { username: "@growthhacker", dealsCompleted: 26, totalRevenue: "$41600", avgOrderValue: "$122" },
  { username: "@brandbuilder", dealsCompleted: 18, totalRevenue: "$28800", avgOrderValue: "$96" },
  { username: "@consultant_pro", dealsCompleted: 22, totalRevenue: "$35200", avgOrderValue: "$110" },
  { username: "@startupguru", dealsCompleted: 20, totalRevenue: "$32000", avgOrderValue: "$100" },
  { username: "@performancemax", dealsCompleted: 27, totalRevenue: "$43200", avgOrderValue: "$124" },
  { username: "@socialmedia_ace", dealsCompleted: 15, totalRevenue: "$24000", avgOrderValue: "$88" },
  { username: "@analytics_pro", dealsCompleted: 19, totalRevenue: "$30400", avgOrderValue: "$102" },
  { username: "@conversion_king", dealsCompleted: 23, totalRevenue: "$36800", avgOrderValue: "$115" },
  { username: "@revenuemaster", dealsCompleted: 25, totalRevenue: "$40000", avgOrderValue: "$120" },
  { username: "@optimizationpro", dealsCompleted: 17, totalRevenue: "$27200", avgOrderValue: "$92" },
  { username: "@funnelbuilder", dealsCompleted: 24, totalRevenue: "$38400", avgOrderValue: "$118" },
  { username: "@automationpro", dealsCompleted: 18, totalRevenue: "$28800", avgOrderValue: "$96" },
  { username: "@scalemasters", dealsCompleted: 26, totalRevenue: "$41600", avgOrderValue: "$122" },
  { username: "@productlaunch", dealsCompleted: 16, totalRevenue: "$25600", avgOrderValue: "$90" },
  { username: "@campaignexpert", dealsCompleted: 22, totalRevenue: "$35200", avgOrderValue: "$110" },
  { username: "@trafficsource", dealsCompleted: 20, totalRevenue: "$32000", avgOrderValue: "$100" },
  { username: "@conversionlab", dealsCompleted: 19, totalRevenue: "$30400", avgOrderValue: "$102" },
  { username: "@pixelperfect", dealsCompleted: 15, totalRevenue: "$24000", avgOrderValue: "$88" },
  { username: "@adstrategy", dealsCompleted: 23, totalRevenue: "$36800", avgOrderValue: "$115" },
  { username: "@emailmarketer", dealsCompleted: 17, totalRevenue: "$27200", avgOrderValue: "$92" },
  { username: "@influencer_hub", dealsCompleted: 21, totalRevenue: "$33600", avgOrderValue: "$105" },
  { username: "@affiliatepro", dealsCompleted: 25, totalRevenue: "$40000", avgOrderValue: "$120" },
  { username: "@ecommguru", dealsCompleted: 24, totalRevenue: "$38400", avgOrderValue: "$118" },
  { username: "@dropshipking", dealsCompleted: 18, totalRevenue: "$28800", avgOrderValue: "$96" },
  { username: "@brandstrategy", dealsCompleted: 20, totalRevenue: "$32000", avgOrderValue: "$100" },
  { username: "@contentking", dealsCompleted: 22, totalRevenue: "$35200", avgOrderValue: "$110" },
  { username: "@seoexpert", dealsCompleted: 19, totalRevenue: "$30400", avgOrderValue: "$102" },
  { username: "@ppcspecialist", dealsCompleted: 26, totalRevenue: "$41600", avgOrderValue: "$122" },
  { username: "@videomarketer", dealsCompleted: 16, totalRevenue: "$25600", avgOrderValue: "$90" },
  { username: "@podcastpro", dealsCompleted: 21, totalRevenue: "$33600", avgOrderValue: "$105" },
  { username: "@communitybuilder", dealsCompleted: 17, totalRevenue: "$27200", avgOrderValue: "$92" },
  { username: "@engagementpro", dealsCompleted: 23, totalRevenue: "$36800", avgOrderValue: "$115" },
  { username: "@viralmasters", dealsCompleted: 25, totalRevenue: "$40000", avgOrderValue: "$120" }
];
export const TopSellers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const columns: Column<Seller>[] = [
    {
      header: "Username",
      accessor: "username",
    },
    {
      header: "Deals Completed (30d)",
      accessor: "dealsCompleted",
    },
    {
      header: "Total Revenue (30d)",
      accessor: "totalRevenue",
    },
    {
      header: "Avg Order Value",
      accessor: "avgOrderValue",
    },
    {
      header: "Actions",
      render: () => <span onClick={()=>{console.log('btn click');}} className="text-gray-500">View Profile</span>,
    },
  ];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sellers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <DataTable
      title="Top Sellers"
      columns={columns}
      data={paginatedData}
      getRowKey={(item) => item.username}
      showPagination={true}
      currentPage={currentPage}
      totalItems={sellers.length}
      itemsPerPage={itemsPerPage}
      onPageChange={setCurrentPage}
    />
  );
};