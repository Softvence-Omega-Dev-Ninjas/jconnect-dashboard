import { useState } from "react";
import {
  Column,
  DataTable,
} from "../../../components/Shared/DataTable/DataTable";
import { Download, MessagesSquare, Trash, View } from "lucide-react";
import { saveAs } from "file-saver";
import {
  useGetUsersQuery,
  User,
  useUpdateUserMutation,
} from "../../../redux/features/users/usersApi";
import ToggleSwitch from "./components/ToggleSwitchBtn/ToggleSwitch";
import { toast } from "sonner";
import { DeleteAlertDialog } from "@/components/Shared/DeleteAlert/DeleteAlert";
import PageHeading from "@/components/Shared/PageHeading/PageHeading";
import UsersSkeleton from "./components/skeleton/UsersSkeleton";
import { useNavigate } from "react-router-dom";
import NoDataFound from "@/components/Shared/NoDataFound/NoDataFound";

const Users = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const itemsPerPage = 3;

  const { data, isLoading, error } = useGetUsersQuery({
    page: currentPage,
    limit: itemsPerPage,
    isActive: statusFilter === "all" ? undefined : statusFilter === "active",
  });

  const users = data?.data || [];
  const totalItems = data?.total || 0;

  const handleExport = () => {
    const header = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Active",
      "Verified",
      "Role",
      "Joined",
    ];
    const body = users.map((r: User) =>
      [
        r.id,
        r.full_name,
        r.email,
        r.phone || "N/A",
        r.isActive,
        r.isVerified,
        r.role,
        new Date(r.created_at).toLocaleDateString(),
      ].join(",")
    );
    const csv = [header.join(","), ...body].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `users_${new Date().toISOString().slice(0, 10)}.csv`);
  };

  const handleStatusChange = (filter: "all" | "active" | "inactive") => {
    console.log(filter, "filter..........");
    setStatusFilter(filter);
    setCurrentPage(1);
  };
  const handleOpenDeleteDialog = (item: User) => {
    if (item.role === "SUPER_ADMIN") {
      toast.error("You can't delete Super Admin");
      return;
    }
    setDeleteDialogOpen(true);
    setIdToDelete(item.id);
  };

  const handleViewDetails = (userId: string) => {
    navigate(`/users/${userId}`);
    console.log(userId);
  };

  const handleDelete = () => {
    // implement delete logic here using idToDelete
    console.log(idToDelete);
  };
  const [updateUser] = useUpdateUserMutation();
  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const res = await updateUser({
        id: userId,
        data: { isActive: !currentStatus },
      }).unwrap();
      toast.success(
        `User '${res.full_name}' has been ${
          res.isActive ? "activated" : "deactivated"
        }.`
      );
    } catch (error) {
      console.error("Failed to toggle user status:", error);
    }
  };
  const columns: Column<User>[] = [
    { header: "Name", accessor: "full_name" },
    { header: "Email", accessor: "email" },
    { header: "Phone", render: (item) => item.phone || "..." },
    { header: "Role", accessor: "role" },
    {
      header: "Active",
      render: (item) => (
        <ToggleSwitch
          checked={item.isActive}
          onChange={() => handleToggleStatus(item.id, item.isActive)}
          disabled={item.role === "SUPER_ADMIN" ? true : false}
        />
      ),
    },
    {
      header: "Joined",
      render: (item) => new Date(item.created_at).toLocaleDateString(),
    },
    {
      header: "Action",
      render: (item) => (
        <div className="flex items-center gap-2">
          <button onClick={(e)=>{
            e.preventDefault()
            handleViewDetails(item.id)
          }} className="p-1 rounded-md text-green-600 hover:bg-gray-100">
            <View className="w-5 h-5" />
          </button>
          <button className="p-1 rounded-md text-blue-600 hover:bg-gray-100">
            <MessagesSquare className="w-5 h-5" />
          </button>
          <button className="p-1 rounded-md text-red-600 hover:bg-gray-100">
            <Trash
              onClick={(e) => {
                e.stopPropagation();
                handleOpenDeleteDialog(item);
              }}
              className="w-5 h-5"
            />
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) return <UsersSkeleton />;
  if (error) return <NoDataFound dataTitle="Users Data" />;

  return (
    <>
      <div className="p-6">
        <PageHeading title="Users management" />

        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4">
          <div className="flex flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <p className="font-semibold text-gray-700">Status:</p>
              <div className="flex gap-2 bg-white p-1 rounded-md shadow">
                <button
                  onClick={() => handleStatusChange("all")}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    statusFilter === "all"
                      ? "bg-red-600 text-white"
                      : "text-gray-700"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => handleStatusChange("active")}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    statusFilter === "active"
                      ? "bg-green-500 text-white"
                      : "text-gray-700"
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => handleStatusChange("inactive")}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    statusFilter === "inactive"
                      ? "bg-gray-500 text-white"
                      : "text-gray-700"
                  }`}
                >
                  Inactive
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleExport}
            className="w-full lg:w-auto lg:ml-auto px-4 py-2 btn-primary text-sm font-medium rounded flex items-center justify-center gap-2"
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
          onPageChange={setCurrentPage}
        />
      </div>

      <DeleteAlertDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        itemName="profile"
        onDelete={handleDelete}
      />
    </>
  );
};

export default Users;
