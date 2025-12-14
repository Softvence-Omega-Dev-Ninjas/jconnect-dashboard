// import { Navigate } from "react-router-dom";
// import Cookies from "js-cookie";

import { ROUTE_PERMISSIONS } from "@/config/rbac";
import { useAppSelector } from "@/redux/hook";
import { ReactNode } from "react";
import { Navigate, useLocation, matchPath } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { role, token } = useAppSelector(state => state.auth);
  const location = useLocation();
  
  if (!token) return <Navigate to="/login" replace />;
  
  // Check exact match first
  let allowedRoles = ROUTE_PERMISSIONS[location.pathname];
  
  // If no exact match, try pattern matching for dynamic routes
  if (!allowedRoles) {
    for (const [pattern, roles] of Object.entries(ROUTE_PERMISSIONS)) {
      if (matchPath(pattern, location.pathname)) {
        allowedRoles = roles;
        break;
      }
    }
  }
  
  if (allowedRoles && !allowedRoles.includes(role!)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};
export default ProtectedRoute;