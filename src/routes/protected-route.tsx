// src/components/ProtectedRoute.tsx
import { getUserRole, Role } from "@/utils/get-role";
import React from "react";

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
  const role: Role = getUserRole();

  if (!allowedRoles.includes(role || "")) {
    return fallback;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
