import { RootState } from "@/app/store";
import { useReadUserQuery } from "@/features/auth/auth-api";
import { logout, setToken } from "@/features/auth/auth-slice";
import { cookieManager } from "@/utils/cookie-manager";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const authInfo = useSelector((state: RootState) => state.auth);
  const [isAuthChecking, setIsAuthChecking] = React.useState(true);

  const jwtToken = cookieManager.getCookie("jwtToken") || "";

  if (jwtToken && !authInfo?.jwtToken) dispatch(setToken(jwtToken));

  const { data, isLoading, isError, status } = useReadUserQuery(undefined, {
    skip: !jwtToken,
  });

  useEffect(() => {
    if (!jwtToken && (isError || !data)) dispatch(logout());

    if (!isLoading && status !== "pending") {
      setIsAuthChecking(false);
    }
  }, [jwtToken, isLoading, status]);

  return { isAuthChecking };
};

export default useAuthCheck;
