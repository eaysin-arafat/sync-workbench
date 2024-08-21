import useAuth from "@/hooks/auth/useAuth";
import { URLDashboard } from "@/routes/router-link";
import { Navigate, Outlet } from "react-router-dom";

// public guard component
const PublicGuard = () => {
  const isLoggedIn = useAuth();
  return isLoggedIn ? <Navigate to={URLDashboard()} /> : <Outlet />;
};

export default PublicGuard;
