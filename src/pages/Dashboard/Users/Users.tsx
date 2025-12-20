/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { saveAs } from "file-saver";
import { Download, Pencil, RefreshCcw, Trash, View } from "lucide-react";

import {
  useDeleteUserMutation,
  useGetUsersQuery,
  User,
  useUpdateUserMutation,
} from "../../../redux/features/users/usersApi";
import { clearSearch } from "@/redux/features/search/searchSlice";

import {
  Column,
  DataTable,
} from "../../../components/Shared/DataTable/DataTable";
import ToggleSwitch from "./components/ToggleSwitchBtn/ToggleSwitch";
import { DeleteAlertDialog } from "@/components/Shared/DeleteAlert/DeleteAlert";
import PageHeading from "@/components/Shared/PageHeading/PageHeading";
import UsersSkeleton from "./components/skeleton/UsersSkeleton";
import NoDataFound from "@/components/Shared/NoDataFound/NoDataFound";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchTerm = useSelector(
    (state: any) => state.search?.searchTerm || ""
  );

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");

  const { data, isLoading, error } = useGetUsersQuery({
    page: currentPage,
    limit: itemsPerPage,
    searchTerm: searchTerm,
    isActive: statusFilter === "all" ? undefined : statusFilter === "active",
  });

  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const users = data?.data || [];
  const totalItems = data?.total || 0;

  const handleStatusChange = (filter: "all" | "active" | "inactive") => {
    setStatusFilter(filter);
    setCurrentPage(1);
  };

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    try {
      await updateUser({
        id: userId,
        data: { isActive: !currentStatus },
      }).unwrap();
      toast.success("User status updated successfully.");
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (!idToDelete) return;
    try {
      await deleteUser(idToDelete).unwrap();
      toast.success("User deleted successfully.");
    } catch (err) {
      toast.error("Failed to delete user.");
    } finally {
      setDeleteDialogOpen(false);
      setIdToDelete(null);
    }
  };

  const handleExport = () => {
    const header = ["Name", "Email", "Phone", "Role", "Joined"];
    const body = users.map((r: User) =>
      [
        r.full_name,
        r.email,
        r.phone || "N/A",
        r.role,
        new Date(r.created_at).toLocaleDateString(),
      ].join(",")
    );
    const csv = [header.join(","), ...body].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `users_${new Date().toISOString().slice(0, 10)}.csv`);
  };

  const columns: Column<User>[] = [
    { header: "Name", accessor: "full_name" },
    { header: "Email", accessor: "email", hideOnMobile: true },
    { header: "Role", accessor: "role" },
    {
      header: "Active",
      render: (item) => (
        <ToggleSwitch
          checked={item.isActive}
          onChange={() => handleToggleStatus(item.id, item.isActive)}
          disabled={item.role === "SUPER_ADMIN"}
        />
      ),
    },
    {
      header: "Action",
      render: (item) => (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => navigate(`/users/${item.id}`)}
            className="p-1 text-green-600"
          >
            <View className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate(`/users/edit/${item.id}`)}
            className="p-1 text-gray-500"
          >
            <Pencil className="w-5 h-5" />
          </button>
          <button className="p-1">
            {item.isActive ? (
              <Trash
                onClick={() => {
                  if (item.role === "SUPER_ADMIN")
                    return toast.error("Cannot delete Super Admin");
                  setIdToDelete(item.id);
                  setDeleteDialogOpen(true);
                }}
                className="w-5 h-5 text-red-600"
              />
            ) : (
              <RefreshCcw
                onClick={() => handleToggleStatus(item.id, item.isActive)}
                className="w-5 h-5 text-blue-500"
              />
            )}
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) return <UsersSkeleton />;
  if (error)
    return <NoDataFound dataTitle="Users" noDataText="Something went wrong!" />;

  return (
    <>
      <div className="space-y-4">
        <PageHeading title="Users management" />

        {searchTerm && (
          <div className="flex items-center justify-between bg-blue-50 border border-blue-100 p-3 rounded-lg">
            <p className="text-sm text-blue-700">
              Showing search results for:{" "}
              <span className="font-bold">"{searchTerm}"</span>
            </p>
            <button
              onClick={() => dispatch(clearSearch())}
              className="text-xs text-blue-600 hover:underline font-semibold"
            >
              Clear Search
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <p className="font-semibold text-gray-700 text-sm">Status:</p>
            <div className="flex gap-1 bg-white p-1 rounded-md shadow-sm border">
              {(["all", "active", "inactive"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleStatusChange(filter)}
                  className={`px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-all ${
                    statusFilter === filter
                      ? "bg-[#BD001F] text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#BD001F] text-white text-sm font-medium rounded"
          >
            Export <Download className="w-4 h-4" />
          </button>
        </div>
        <DataTable
          columns={columns}
          data={users}
          getRowKey={(item) => item.id}
          showPagination={true}
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      <DeleteAlertDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        itemName="user profile"
        onDelete={handleDelete}
      />
    </>
  );
};

export default Users;
