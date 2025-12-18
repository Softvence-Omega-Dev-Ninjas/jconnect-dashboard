// src/Layouts/DashboardLayout.tsx
import Navbar from "@/components/Shared/Navbar/Navbar";
import { Sidebar } from "@/components/Shared/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useEffect } from "react";

export default function DashboardLayout() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  
  const { data } = useGetMeQuery(undefined, { skip: !token || !!user });
  useEffect(() => {
    if (data && token) {
      dispatch(setCredentials({ user: data, token }));
    }
  }, [data, token, dispatch]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 w-full lg:ml-64 min-w-0">
        <Navbar />
        <main className="pt-20 px-3 pb-4 sm:px-4 md:px-6 md:pb-6 w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
