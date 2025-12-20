/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/users/usersApi";
import { useSelector } from "react-redux";
import { User as UserIcon } from "lucide-react";
import { toast } from "sonner";
import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";
import NoDataFound from "@/components/Shared/NoDataFound/NoDataFound";
import PageHeading from "@/components/Shared/PageHeading/PageHeading";

const RoleManagement = () => {
  const { user: currentUser } = useSelector((state: any) => state.auth);
  const searchTerm = useSelector(
    (state: any) => state.search?.searchTerm || ""
  );

  const { data, isLoading, error } = useGetUsersQuery({
    page: 1,
    limit: 50,
    search: searchTerm,
  });
  const [updateRole, { isLoading: isUpdating }] = useUpdateUserRoleMutation();

  const users = data?.data || [];
  const isSuperAdmin = currentUser?.role === "SUPER_ADMIN";

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await updateRole({ userId, role: newRole }).unwrap();
      toast.success(`Role updated to ${newRole} successfully`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update role");
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    return <NoDataFound dataTitle="Role Management Data" />;
  }

  return (
    <div className="">
      {isSuperAdmin && (
        <>
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between mb-6 mt-10">
            <PageHeading title="Admin Role Management" />
            <button className=" text-white font-medium bg-[#BD001F] px-3 py-1 rounded-full border border-red-500">
              Total Users: {data?.total || 0}
            </button>
          </div>
          <div className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="overflow-x-auto border rounded-2xl border-gray-50">
              <div className="max-h-[460px] overflow-y-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-gray-50 z-10">
                    <tr className="border-b border-gray-100">
                      <th className="p-4 font-semibold text-gray-600 text-sm">
                        User Details
                      </th>
                      <th className="p-4 font-semibold text-gray-600 text-sm text-center">
                        Current Role
                      </th>
                      {isSuperAdmin && (
                        <th className="p-4 font-semibold text-gray-600 text-sm text-center">
                          Manage Role
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user: any) => (
                      <tr
                        key={user.id}
                        className="border-b border-gray-50 hover:bg-gray-50/50 transition-all"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-50 rounded-full">
                              <UserIcon className="w-4 h-4 text-indigo-600" />
                            </div>
                            <div>
                              <p className="text-gray-700 font-bold text-sm">
                                {user.full_name}
                              </p>
                              <p className="text-gray-400 text-xs">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              user.role === "SUPER_ADMIN"
                                ? "bg-purple-100 text-purple-700 border border-purple-200"
                                : user.role === "ADMIN"
                                ? "bg-blue-100 text-blue-700 border border-blue-200"
                                : user.role === "ARTIST"
                                ? "bg-orange-100 text-orange-700 border border-orange-200"
                                : "bg-gray-100 text-gray-600 border border-gray-200"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>

                        {isSuperAdmin && (
                          <td className="p-4 text-center">
                            <select
                              disabled={
                                isUpdating || user.id === currentUser?.id
                              }
                              value={user.role}
                              onChange={(e) =>
                                handleRoleChange(user.id, e.target.value)
                              }
                              className="bg-white border border-gray-200 rounded-xl p-2 text-xs font-medium focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer disabled:opacity-40 transition-all hover:border-indigo-300 shadow-sm"
                            >
                              <option value="ARTIST">Artist</option>
                              <option value="ADMIN">Admin</option>
                              <option value="SUPER_ADMIN">Super Admin</option>
                            </select>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RoleManagement;
