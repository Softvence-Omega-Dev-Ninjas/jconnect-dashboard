// src/routes/Routes.tsx
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Dashboard from "@/pages/Dashboard/Dashboard/Dashboard";
import Login from "@/pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute";
import Users from "@/pages/Dashboard/Users/Users";
import Payments from "@/pages/Dashboard/Payments/Payments";
import Reports from "@/pages/Dashboard/Reports/Reports";
import Settings from "@/pages/Dashboard/Settings/Settings";
import Disputes from "@/pages/Dashboard/Disputes/Disputes";
import DisputeView from "@/pages/Dashboard/Disputes/DisputeView/DisputeView";
import SingleUserDetail from "@/pages/Dashboard/Users/components/UserDetails/UserDetailsPage";
import EditUser from "@/pages/Dashboard/Users/components/UserEdit/UserEdit";
import ForgotPassword from "@/pages/Login/ForgetPassword/ForgetPassword";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute
            allowedRoles={[
              "SUPER_ADMIN",
              "FINANCE_ADMIN",
              "ANALYST",
              "SUPPORT_ADMIN",
            ]}
          >
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/users",
        element: (
          <ProtectedRoute allowedRoles={["SUPER_ADMIN", "SUPPORT_ADMIN"]}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: "/users/:id",
        element: (
          <ProtectedRoute allowedRoles={["SUPER_ADMIN", "SUPPORT_ADMIN"]}>
            <SingleUserDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "/users/edit/:id",
        element: (
          <ProtectedRoute allowedRoles={["SUPER_ADMIN", "SUPPORT_ADMIN"]}>
            <EditUser />
          </ProtectedRoute>
        ),
      },
      {
        path: "/payments",
        element: (
          <ProtectedRoute allowedRoles={["SUPER_ADMIN", "FINANCE_ADMIN"]}>
            <Payments />
          </ProtectedRoute>
        ),
      },
      {
        path: "/reports",
        element: (
          <ProtectedRoute allowedRoles={["SUPER_ADMIN", "FINANCE_ADMIN"]}>
            <Reports />
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: "disputes",
        element: (
          <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
            <Disputes />
          </ProtectedRoute>
        ),
      },
      {
        path: "disputes/:id",
        element: (
          <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
            <DisputeView />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default routes;
