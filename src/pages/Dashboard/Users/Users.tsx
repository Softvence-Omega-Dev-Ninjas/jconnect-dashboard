import { Column, DataTable } from "@/components/Shared/DataTable/DataTable";
import { useMemo, useState, useEffect } from "react";
import ToggleSwitch from "./components/ToggleSwitchBtn/ToggleSwitch";
import { Download, MessagesSquare, Trash, View } from "lucide-react";
import { saveAs } from "file-saver"; 

type UserRow = {
  id: string;
  username: string;
  rating: number;
  totalEarnings: number;
  isActive: boolean;
  joiningDate: string;
  totalServices: number;
};

const dummyUsers: UserRow[] = [
  {
    id: "#1124",
    username: "@djinovax",
    rating: 5.0,
    totalEarnings: 5000,
    isActive: true,
    joiningDate: "2024-01-01",
    totalServices: 20,
  },
  {
    id: "#1125",
    username: "@djinovax1",
    rating: 5.0,
    totalEarnings: 5100,
    isActive: true,
    joiningDate: "2024-01-02",
    totalServices: 21,
  },
  {
    id: "#1126",
    username: "@djinovax2",
    rating: 5.0,
    totalEarnings: 5200,
    isActive: false,
    joiningDate: "2024-01-03",
    totalServices: 22,
  },
  {
    id: "#1127",
    username: "@djinovax3",
    rating: 5.0,
    totalEarnings: 5300,
    isActive: true,
    joiningDate: "2024-01-04",
    totalServices: 23,
  },
  {
    id: "#1128",
    username: "@djinovax4",
    rating: 5.0,
    totalEarnings: 5400,
    isActive: true,
    joiningDate: "2024-01-05",
    totalServices: 20,
  },
  {
    id: "#1168",
    username: "@djinovax44",
    rating: 5.0,
    totalEarnings: 5400,
    isActive: true,
    joiningDate: "2024-02-14",
    totalServices: 20,
  },
];

// --- HELPER FUNCTIONS ---
const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

const inDateRange = (dateISO: string, range: string) => {
  if (range === "all") return true;
  const date = new Date(dateISO + "T00:00:00");
  const now = new Date();
  
  if (range === "month") {
    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }
  
  return true;
};

const downloadCSV = (rows: UserRow[]) => {
  // CSV export implementation 
  const header = [
    "ID",
    "Username",
    "Rating",
    "Total Earnings",
    "Active",
    "Joining Date",
    "Total Services",
  ];
  const body = rows.map((r) =>
    [
      r.id,
      r.username,
      r.rating.toFixed(1),
      r.totalEarnings,
      r.isActive ? "Active" : "Inactive",
      r.joiningDate,
      r.totalServices,
    ].join(",")
  );
  const csv = [header.join(","), ...body].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, `users_export_${new Date().toISOString().slice(0, 10)}.csv`);
};

const Users = () => {
  const [users, setUsers] = useState<UserRow[]>(dummyUsers);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [dateRange, setDateRange] = useState<"all" | "month" | "30" | "7">(
    "all" // Set default to 'All Time'
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // --- Filtering Logic ---
  const filteredUsers = useMemo(() => {
    const f = users.filter((u) => {
      if (statusFilter === "active" && !u.isActive) return false;
      if (statusFilter === "inactive" && u.isActive) return false;
      if (!inDateRange(u.joiningDate, dateRange)) return false;
      return true;
    });
    return f;
  }, [users, statusFilter, dateRange]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, dateRange]);

  // --- Pagination Logic ---
  const totalItems = filteredUsers.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // --- Action Handlers ---
  const toggleActive = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u))
    );
  };

  const handleExport = () => {
    downloadCSV(filteredUsers);
  };

  const handleDelete = (id: string) => {
    console.log(`Deleting user: ${id}`);
  };

  // --- DataTable Columns ---
  const columns: Column<UserRow>[] = [
    { header: "ID", accessor: "id" },
    { header: "Username", accessor: "username" },
    { header: "Rating", accessor: "rating" },
    {
      header: "Total Earnings",
      render: (item) => formatCurrency(item.totalEarnings),
    },
    {
      header: "Active/Inactive",
      render: (item) => (
        <ToggleSwitch
          checked={item.isActive}
          onChange={() => toggleActive(item.id)}
        />
      ),
    },
    {
      header: "Joining Date",
      render: (item) => new Date(item.joiningDate).toLocaleDateString(),
    },
    { header: "Total Services", accessor: "totalServices" },
    {
      header: "Action",
      cellClassName: "w-px",
      render: (item) => (
        <div className="flex items-center gap-2">
          <button
            title="View"
            className="p-1 rounded-md text-green-600 hover:bg-gray-100"
          >
            <View className="w-5 h-5" />
          </button>
          <button
            title="Message"
            className="p-1 rounded-md text-blue-600 hover:bg-gray-100"
          >
            <MessagesSquare className="w-5 h-5" />
          </button>
          <button
            title="Delete"
            className="p-1 rounded-md text-red-600 hover:bg-gray-100"
            onClick={() => handleDelete(item.id)}
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-2">
          <h1 className="text-[32px] font-bold ">User's management</h1>
          <p className="text-sm text-gray-500">Manage platform users</p>
        </div>
      </div>

      {/* --- Controls Section */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4">
        <div className="flex flex-row sm:items-center gap-4">
          {/* Status Filter */}
          <div className="flex items-center gap-3">
            <p className="font-semibold text-gray-700">Status:</p>
            <div className="flex gap-2 bg-white p-1 rounded-md shadow">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  statusFilter === "all"
                    ? "bg-red-600 text-white"
                    : "text-gray-700 hover:bg-white"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter("active")}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  statusFilter === "active"
                    ? "bg-green-500 text-white"
                    : "text-gray-700 hover:bg-white"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setStatusFilter("inactive")}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  statusFilter === "inactive"
                    ? "bg-gray-500 text-white"
                    : "text-gray-700 hover:bg-white"
                }`}
              >
                Inactive
              </button>
            </div>
          </div>

          {/* Date Range Dropdown */}
          <div className="flex items-center gap-3">
            <p className=" font-semibold text-gray-700">Date Range:</p>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as any)}
              className="text-sm px-3 py-1 rounded border border-gray-300 bg-white shadow-sm"
            >
              <option value="month">This Month</option>
              <option value="30">Last 30 Days</option>
              <option value="7">Last 7 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>

        {/* Export Button */}
        <button
          onClick={handleExport}
          className="bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 flex items-center gap-2 transition-colors"
        >
          Export
          <Download className="w-4 h-4" />
        </button>
      </div>

      {/* --- DataTable --- */}
      <DataTable
        title=""
        columns={columns}
        data={paginatedData}
        getRowKey={(item) => item.id}
        showPagination={true}
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Users;
