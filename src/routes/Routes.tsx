// src/routes/Routes.tsx
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Dashboard from "@/pages/Dashboard/Dashboard/Dashboard";
import Login from "@/pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute";
import Disputes from "@/pages/Dashboard/Disputes/Disputes";

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
        path: "disputes",
        element: <Disputes />,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default routes;
