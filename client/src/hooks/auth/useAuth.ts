import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

// useAuth hook for checking if the user is authenticated
const useAuth = () => {
  const { isLoggedIn, jwtToken } = useSelector(
    (state: RootState) => state.auth
  );

  if (jwtToken && isLoggedIn) return true;
  return false;
};

export default useAuth;
