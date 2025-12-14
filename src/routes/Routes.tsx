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
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/users",
        element: (
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: "/users/:id",
        element: (
          <ProtectedRoute>
            <SingleUserDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "/users/edit/:id",
        element: (
          <ProtectedRoute>
            <EditUser />
          </ProtectedRoute>
        ),
      },
      {
        path: "/payments",
        element: (
          <ProtectedRoute>
            <Payments />
          </ProtectedRoute>
        ),
      },
      {
        path: "/reports",
        element: (
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: "disputes",
        element: (
          <ProtectedRoute>
            <Disputes />
          </ProtectedRoute>
        ),
      },
      {
        path: "disputes/:id",
        element: (
          <ProtectedRoute>
            <DisputeView />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default routes;
