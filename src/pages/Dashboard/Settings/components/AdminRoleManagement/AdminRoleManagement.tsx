/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useGetAllUsersQuery, useUpdateUserRoleMutation } from "@/redux/features/users/usersApi";
// import { useSelector } from "react-redux";
// import { ShieldCheck } from "lucide-react";
// import { toast } from "sonner";

// const RoleManagement = () => {
//   const { user: currentUser } = useSelector((state: any) => state.auth);
  
//   const { data: users, isLoading } = useGetAllUsersQuery();
//   const [updateRole, { isLoading: isUpdating }] = useUpdateUserRoleMutation();

//   const isSuperAdmin = currentUser?.role === "SUPER_ADMIN";

//   const handleRoleChange = async (userId: string, newRole: string) => {
//     try {
//       await updateRole({ userId, role: newRole }).unwrap();
//       toast.success(`Role updated to ${newRole}`);
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Failed to update role");
//     }
//   };

//   if (isLoading) return <div className="p-10 text-center">Loading Users...</div>;

//   return (
//     <div className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
//       <div className="flex items-center gap-2 mb-6">
//         <ShieldCheck className="text-indigo-600 w-6 h-6" />
//         <h2 className="text-xl font-bold text-gray-800">User Role Management</h2>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-gray-50 border-b border-gray-100">
//               <th className="p-4 font-semibold text-gray-600">Name</th>
//               <th className="p-4 font-semibold text-gray-600">Email</th>
//               <th className="p-4 font-semibold text-gray-600">Current Role</th>
//               {isSuperAdmin && <th className="p-4 font-semibold text-gray-600 text-center">Manage Role</th>}
//             </tr>
//           </thead>
//           <tbody>
//             {users?.map((user) => (
//               <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-all">
//                 <td className="p-4 text-gray-700 font-medium">{user.full_name}</td>
//                 <td className="p-4 text-gray-500 text-sm">{user.email}</td>
//                 <td className="p-4">
//                   <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                     user.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700' :
//                     user.role === 'ADMIN' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
//                   }`}>
//                     {user.role}
//                   </span>
//                 </td>
                
//                 {/* শুধুমাত্র সুপার এডমিন হলে এই কলামটি দেখাবে */}
//                 {isSuperAdmin && (
//                   <td className="p-4 text-center">
//                     <select
//                       disabled={isUpdating || user.id === currentUser.id} // নিজের রোল নিজে চেঞ্জ করা ব্লক
//                       value={user.role}
//                       onChange={(e) => handleRoleChange(user.id, e.target.value)}
//                       className="bg-white border border-gray-200 rounded-lg p-1.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer disabled:bg-gray-50"
//                     >
//                       <option value="USER">User</option>
//                       <option value="ADMIN">Admin</option>
//                       <option value="SUPER_ADMIN">Super Admin</option>
//                     </select>
//                   </td>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default RoleManagement;


import  { useState } from "react";
import { ShieldCheck, UserCog, Search, Mail, User as UserIcon } from "lucide-react";
import { toast } from "react-hot-toast";

interface User {
  id: string;
  full_name: string;
  email: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  status: "ACTIVE" | "INACTIVE";
}

const DUMMY_USERS: User[] = [
  { id: "1", full_name: "Saikat Rahman", email: "saikat@example.com", role: "SUPER_ADMIN", status: "ACTIVE" },
  { id: "2", full_name: "Arif Ahmed", email: "arif@example.com", role: "ADMIN", status: "ACTIVE" },
  { id: "3", full_name: "Mehedi Hasan", email: "mehedi@example.com", role: "USER", status: "ACTIVE" },
  { id: "4", full_name: "Tanvir Hossain", email: "tanvir@example.com", role: "USER", status: "INACTIVE" },
  { id: "5", full_name: "Sumaiya Akter", email: "sumaiya@example.com", role: "ADMIN", status: "ACTIVE" },
];

const RoleManagement = () => {
  const [users, setUsers] = useState<User[]>(DUMMY_USERS);
  
  const isSuperAdmin = true; 

  const handleRoleChange = (userId: string, newRole: User["role"]) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    toast.success(`Role updated to ${newRole} successfully!`);
  };

  return (
    <div className=" bg-gray-50">
      <div className="space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <ShieldCheck className="text-indigo-600 w-7 h-7" />
              Role Management
            </h1>
            <p className="text-gray-500 text-sm mt-1">Manage user permissions and administrative roles.</p>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64"
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="p-5 font-semibold text-gray-600 text-sm uppercase tracking-wider">User Info</th>
                  <th className="p-5 font-semibold text-gray-600 text-sm uppercase tracking-wider">Status</th>
                  <th className="p-5 font-semibold text-gray-600 text-sm uppercase tracking-wider">Current Role</th>
                  {isSuperAdmin && (
                    <th className="p-5 font-semibold text-gray-600 text-sm uppercase tracking-wider text-center">
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                          <UserIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">{user.full_name}</p>
                          <div className="flex items-center gap-1 text-gray-500 text-xs">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        user.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {user.status}
                      </span>
                    </td>

                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center w-fit gap-1.5 ${
                        user.role === 'SUPER_ADMIN' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                        user.role === 'ADMIN' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 
                        'bg-gray-50 text-gray-600 border border-gray-100'
                      }`}>
                        {user.role === 'SUPER_ADMIN' && <ShieldCheck className="w-3 h-3" />}
                        {user.role}
                      </span>
                    </td>

                    {isSuperAdmin && (
                      <td className="p-5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <UserCog className="w-4 h-4 text-gray-400" />
                          <select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user.id, e.target.value as any)}
                            className="bg-white border border-gray-200 rounded-lg py-1.5 px-3 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer hover:border-indigo-300 transition-all"
                          >
                            <option value="USER">Make User</option>
                            <option value="ADMIN">Make Admin</option>
                            <option value="SUPER_ADMIN">Make Super Admin</option>
                          </select>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {!isSuperAdmin && (
          <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3">
            <div className="bg-amber-100 p-2 rounded-lg text-amber-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-amber-800 font-bold text-sm">Restricted Access</p>
              <p className="text-amber-700 text-xs mt-0.5">You can view roles but only a Super Admin can change them.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleManagement;