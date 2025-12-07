import Navbar from "@/components/Shared/Navbar/Navbar";
import { Sidebar } from "@/components/Shared/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 lg:ml-64">
        <Navbar />
        <main className="pt-16 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
