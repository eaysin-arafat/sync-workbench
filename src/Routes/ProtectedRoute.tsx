// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallback: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  fallback,
}) => {
  const location = useLocation();
  const { role, token } = useSelector((state: RootState) => state.userReducer);

  if (!token) {
    return <Navigate to={"/"} state={{ from: location }} />;
  }

  if (!allowedRoles.includes(role || "")) {
    return fallback;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
