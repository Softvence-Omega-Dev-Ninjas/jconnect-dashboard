// import { Navigate } from "react-router-dom";
// import Cookies from "js-cookie";

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const token = Cookies.get('token');
  
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }
  
//   return <>{children}</>;
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

type UserRole = 'SUPER_ADMIN' | 'FINANCE_ADMIN' | 'ANALYST' | 'SUPPORT_ADMIN';

interface ProtectedRouteProps {
  allowedRoles: UserRole[]; 
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const token = Cookies.get('token');
  const userRole = Cookies.get('role'); 

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  if (!userRole) {
      return <Navigate to="/login" replace />;
  }

  const isAuthorized = allowedRoles.includes(userRole as UserRole);

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;