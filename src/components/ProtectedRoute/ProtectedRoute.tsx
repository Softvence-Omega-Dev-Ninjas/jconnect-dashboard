import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ requiredRole }: { requiredRole: string }) => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
