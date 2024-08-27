import useAuth from "@/hooks/auth/useAuth";
import { getDashboardLink } from "@/routes/router-link";
import { Navigate, Outlet } from "react-router-dom";

// public guard component
const PublicGuard = () => {
  const isLoggedIn = useAuth();
  return isLoggedIn ? <Navigate to={getDashboardLink()} /> : <Outlet />;
};

export default PublicGuard;
