// src/routes/Routes.tsx
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Dashboard from "@/pages/Dashboard/Dashboard/Dashboard";
import Login from "@/pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute";
import Users from "@/pages/Dashboard/Users/Users";
import Payments from "@/pages/Dashboard/Payments/Payments";
import Disputes from "@/pages/Dashboard/Disputes/Disputes";
import Reports from "@/pages/Dashboard/Reports/Reports";
import Settings from "@/pages/Dashboard/Settings/Settings";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/payments",
        element: <Payments />,
      },
      {
        path: "/disputes",
        element: <Disputes />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default routes;
