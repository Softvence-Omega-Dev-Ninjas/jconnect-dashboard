import React, { useMemo, useState, useEffect } from "react";
import { saveAs } from "file-saver";
import { Download, MessagesSquare, Trash, View } from "lucide-react";
import ToggleSwitch from "./components/ToggleSwitchBtn/ToggleSwitch";


type UserRow = {
  id: string;
  username: string;
  rating: number;
  totalEarnings: number;
  isActive: boolean;
  joiningDate: string;
  totalServices: number;
};

// **FIXED: Ensure all IDs are unique.**
const dummyUsers: UserRow[] = [
  { id: "#1124", username: "@djinovax_01", rating: 5.0, totalEarnings: 5000, isActive: true, joiningDate: "2024-01-01", totalServices: 20 },
  { id: "#1125", username: "@djinovax_02", rating: 5.0, totalEarnings: 5100, isActive: true, joiningDate: "2024-01-02", totalServices: 21 },
  { id: "#1126", username: "@djinovax_03", rating: 5.0, totalEarnings: 5200, isActive: false, joiningDate: "2024-01-03", totalServices: 22 },
  { id: "#1127", username: "@djinovax_04", rating: 5.0, totalEarnings: 5300, isActive: true, joiningDate: "2024-01-04", totalServices: 23 },
  { id: "#1128", username: "@djinovax_05", rating: 5.0, totalEarnings: 5400, isActive: true, joiningDate: "2024-01-05", totalServices: 20 },
  { id: "#1129", username: "@djinovax_06", rating: 5.0, totalEarnings: 5000, isActive: true, joiningDate: "2024-01-06", totalServices: 21 },
  { id: "#1130", username: "@djinovax_07", rating: 5.0, totalEarnings: 5100, isActive: true, joiningDate: "2024-01-07", totalServices: 22 },
  { id: "#1131", username: "@djinovax_08", rating: 5.0, totalEarnings: 5200, isActive: false, joiningDate: "2024-01-08", totalServices: 23 },
  { id: "#1132", username: "@djinovax_09", rating: 5.0, totalEarnings: 5300, isActive: true, joiningDate: "2024-01-09", totalServices: 20 },
  { id: "#1133", username: "@djinovax_10", rating: 5.0, totalEarnings: 5400, isActive: true, joiningDate: "2024-01-10", totalServices: 21 },
  { id: "#1134", username: "@djinovax_11", rating: 5.0, totalEarnings: 5000, isActive: true, joiningDate: "2024-01-11", totalServices: 22 },
  { id: "#1135", username: "@djinovax_12", rating: 5.0, totalEarnings: 5100, isActive: true, joiningDate: "2024-01-12", totalServices: 23 },
  { id: "#1136", username: "@djinovax_13", rating: 5.0, totalEarnings: 5200, isActive: false, joiningDate: "2024-01-13", totalServices: 20 },
  { id: "#1137", username: "@djinovax_14", rating: 5.0, totalEarnings: 5300, isActive: true, joiningDate: "2024-01-14", totalServices: 21 },
  { id: "#1138", username: "@djinovax_15", rating: 5.0, totalEarnings: 5400, isActive: true, joiningDate: "2024-01-15", totalServices: 22 },
  { id: "#1139", username: "@djinovax_16", rating: 5.0, totalEarnings: 5000, isActive: true, joiningDate: "2024-01-16", totalServices: 23 },
  { id: "#1140", username: "@djinovax_17", rating: 5.0, totalEarnings: 5100, isActive: true, joiningDate: "2024-01-17", totalServices: 20 },
  { id: "#1141", username: "@djinovax_18", rating: 5.0, totalEarnings: 5200, isActive: false, joiningDate: "2024-01-18", totalServices: 21 },
  { id: "#1142", username: "@djinovax_19", rating: 5.0, totalEarnings: 5300, isActive: true, joiningDate: "2024-01-19", totalServices: 22 },
  { id: "#1143", username: "@djinovax_20", rating: 5.0, totalEarnings: 5400, isActive: true, joiningDate: "2024-01-20", totalServices: 23 },
  { id: "#1144", username: "@djinovax_21", rating: 5.0, totalEarnings: 5000, isActive: true, joiningDate: "2024-01-21", totalServices: 20 },
  { id: "#1145", username: "@djinovax_22", rating: 5.0, totalEarnings: 5100, isActive: true, joiningDate: "2024-01-22", totalServices: 21 },
  { id: "#1146", username: "@djinovax_23", rating: 5.0, totalEarnings: 5200, isActive: false, joiningDate: "2024-01-23", totalServices: 22 },
  { id: "#1147", username: "@djinovax_24", rating: 5.0, totalEarnings: 5300, isActive: true, joiningDate: "2024-01-24", totalServices: 23 },
  { id: "#1148", username: "@djinovax_25", rating: 5.0, totalEarnings: 5400, isActive: true, joiningDate: "2024-01-25", totalServices: 20 },
  { id: "#1149", username: "@djinovax_26", rating: 5.0, totalEarnings: 5000, isActive: true, joiningDate: "2024-01-26", totalServices: 21 },
  { id: "#1150", username: "@djinovax_27", rating: 5.0, totalEarnings: 5100, isActive: true, joiningDate: "2024-01-27", totalServices: 22 },
  { id: "#1151", username: "@djinovax_28", rating: 5.0, totalEarnings: 5200, isActive: false, joiningDate: "2024-01-28", totalServices: 23 },
  { id: "#1152", username: "@djinovax_29", rating: 5.0, totalEarnings: 5300, isActive: true, joiningDate: "2024-01-29", totalServices: 20 },
  { id: "#1153", username: "@djinovax_30", rating: 5.0, totalEarnings: 5400, isActive: true, joiningDate: "2024-01-30", totalServices: 21 },
  { id: "#1154", username: "@djinovax_31", rating: 5.0, totalEarnings: 5000, isActive: true, joiningDate: "2024-01-31", totalServices: 22 },
  { id: "#1155", username: "@djinovax_32", rating: 5.0, totalEarnings: 5100, isActive: true, joiningDate: "2024-02-01", totalServices: 23 },
  { id: "#1156", username: "@djinovax_33", rating: 5.0, totalEarnings: 5200, isActive: false, joiningDate: "2024-02-02", totalServices: 20 },
  { id: "#1157", username: "@djinovax_34", rating: 5.0, totalEarnings: 5300, isActive: true, joiningDate: "2024-02-03", totalServices: 21 },
  { id: "#1158", username: "@djinovax_35", rating: 5.0, totalEarnings: 5400, isActive: true, joiningDate: "2024-02-04", totalServices: 22 },
  { id: "#1159", username: "@djinovax_36", rating: 5.0, totalEarnings: 5000, isActive: true, joiningDate: "2024-02-05", totalServices: 23 },
  { id: "#1160", username: "@djinovax_37", rating: 5.0, totalEarnings: 5100, isActive: true, joiningDate: "2024-02-06", totalServices: 20 },
  { id: "#1161", username: "@djinovax_38", rating: 5.0, totalEarnings: 5200, isActive: false, joiningDate: "2024-02-07", totalServices: 21 },
  { id: "#1162", username: "@djinovax_39", rating: 5.0, totalEarnings: 5300, isActive: true, joiningDate: "2024-02-08", totalServices: 22 },
  { id: "#1163", username: "@djinovax_40", rating: 5.0, totalEarnings: 5400, isActive: true, joiningDate: "2024-02-09", totalServices: 23 },
  { id: "#1164", username: "@djinovax_41", rating: 5.0, totalEarnings: 5000, isActive: true, joiningDate: "2024-02-10", totalServices: 20 },
  { id: "#1165", username: "@djinovax_42", rating: 5.0, totalEarnings: 5100, isActive: true, joiningDate: "2024-02-11", totalServices: 21 },
  { id: "#1166", username: "@djinovax_43", rating: 5.0, totalEarnings: 5200, isActive: false, joiningDate: "2024-02-12", totalServices: 22 },
  { id: "#1167", username: "@djinovax_44", rating: 5.0, totalEarnings: 5300, isActive: true, joiningDate: "2024-02-13", totalServices: 23 },
  { id: "#1168", username: "@djinovax_45", rating: 5.0, totalEarnings: 5400, isActive: true, joiningDate: "2024-02-14", totalServices: 20 },
];


const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

const inDateRange = (dateISO: string, range: string) => {
  if (range === "all") return true;
  // Parse date correctly, ensuring it's treated as UTC or matching the dummy data format
  const date = new Date(dateISO + "T00:00:00");
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (range === "7") return diffDays <= 7;
  if (range === "30") return diffDays <= 30;
  if (range === "month") {
    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }
  return true;
};

const downloadCSV = (rows: UserRow[]) => {
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

const PER_PAGE = 9;

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserRow[]>(dummyUsers);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  // **FIXED: Changed default to "all" to show all dummy data on load.**
  const [dateRange, setDateRange] = useState<"all" | "month" | "30" | "7">(
    "all"
  );
  const [page, setPage] = useState<number>(1);

  // derived filtered list
  const filtered = useMemo(() => {
    const f = users.filter((u) => {
      if (statusFilter === "active" && !u.isActive) return false;
      if (statusFilter === "inactive" && u.isActive) return false;
      if (!inDateRange(u.joiningDate, dateRange)) return false;
      return true;
    });
    return f;
  }, [users, statusFilter, dateRange]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const startIndex = (page - 1) * PER_PAGE;
  const visible = filtered.slice(startIndex, startIndex + PER_PAGE);

  const toggleActive = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u))
    );
  };

  const handleExport = () => {
    downloadCSV(filtered);
  };

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  // reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [statusFilter, dateRange]);

  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-2">
          <h1 className="text-[32px] font-bold ">User's management</h1>
          <p className="text-sm text-gray-500">Manage platform users</p>
        </div>
      </div>

      {/* Controls */}
      <div className=" mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <p className="font-semibold mr-2">Status:</p>
            <div className="flex gap-2 bg-white p-2 rounded-md shadow">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-3 py-1 rounded-md text-sm ${
                  statusFilter === "all"
                    ? "bg-[#BD001F] text-white "
                    : " text-gray-700"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter("active")}
                className={`px-3 py-1 rounded-md text-sm ${
                  statusFilter === "active"
                    ? "bg-green-500 text-white "
                    : " text-gray-700"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setStatusFilter("inactive")}
                className={`px-3 py-1 rounded-md text-sm ${
                  statusFilter === "inactive"
                    ? "bg-gray-500 text-white"
                    : " text-gray-700"
                }`}
              >
                Inactive
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <p className=" font-semibold">Date Range:</p>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as any)}
              className="text-sm px-3 py-1 rounded border bg-white"
            >
              <option value="month">This Month</option>
              <option value="30">Last 30 Days</option>
              <option value="7">Last 7 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 flex items-center gap-2"
            title="Export visible rows"
          >
            Export
            <Download />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-white border-b">
            <tr>
              <th className="text-left p-4 text-sm text-gray-600">ID</th>
              <th className="text-left p-4 text-sm text-gray-600">Username</th>
              <th className="text-left p-4 text-sm text-gray-600">Rating</th>
              <th className="text-left p-4 text-sm text-gray-600">
                Total Earnings
              </th>
              <th className="text-left p-4 text-sm text-gray-600">
                Active/Inactive
              </th>
              <th className="text-left p-4 text-sm text-gray-600">
                Joining Date
              </th>
              <th className="text-left p-4 text-sm text-gray-600">
                Total Services
              </th>
              <th className="text-right p-4 text-sm text-gray-600">Action</th>
            </tr>
          </thead>

          <tbody>
            {visible.map((u) => (
              <tr key={u.id} className="border-b last:border-b-0">
                <td className="p-4 text-sm text-gray-700">{u.id}</td>
                <td className="p-4 text-sm text-gray-700">{u.username}</td>
                <td className="p-4 text-sm text-gray-700">
                  {u.rating.toFixed(1)}
                </td>
                <td className="p-4 text-sm text-gray-700">
                  {formatCurrency(u.totalEarnings)}
                </td>
                <td className="p-4 text-sm text-gray-700">
                  <ToggleSwitch
                    checked={u.isActive}
                    onChange={() => toggleActive(u.id)}
                  />
                </td>

                <td className="p-4 text-sm text-gray-700">
                  {new Date(u.joiningDate).toLocaleDateString()}
                </td>
                <td className="p-4 text-sm text-gray-700">{u.totalServices}</td>
                <td className="p-4 text-sm text-right">
                  <div className="inline-flex items-center gap-2">
                    <button
                      title="View"
                      className="p-2 rounded-md border hover:bg-gray-50"
                    >
                      <View />
                    </button>
                    <button
                      title="message"
                      className="p-2 rounded-md border hover:bg-gray-50"
                    >
                      <MessagesSquare />
                    </button>
                    <button
                      title="Delete"
                      className="p-2 rounded-md border hover:bg-gray-50"
                    >
                      <Trash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer / Pagination */}
        <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-500">
          <div>
            Showing {startIndex + 1}-{Math.min(startIndex + PER_PAGE, total)} of{" "}
            {total}
          </div>

          <div className="inline-flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="px-3 py-1 rounded border disabled:opacity-50"
            >
              &lt;
            </button>
            <div className="px-3 py-1">{page}</div>
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="px-3 py-1 rounded border disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;