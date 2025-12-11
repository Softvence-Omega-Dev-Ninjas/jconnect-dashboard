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
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },{
        path: "disputes",
        element: <Disputes />,
      },
      {
        path: "disputes/:id",
        element: <DisputeView />,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default routes;
