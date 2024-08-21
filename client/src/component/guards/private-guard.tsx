import useAuth from "@/hooks/auth/useAuth";
import { Navigate, Outlet } from "react-router-dom";

// private guard component
const PrivateGuard = () => {
  const isLoggedIn = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateGuard;
