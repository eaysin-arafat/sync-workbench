// utils/auth-utils.ts
import { login, logout } from "@/features/auth/auth-slice";
import { cookieManager } from "@/utils/cookie-manager";

export async function handleAuthResponse(result: any, dispatch: any) {
  const { jwt, user } = result?.data;

  if (jwt) {
    cookieManager.saveCookie("jwtToken", jwt, {
      sameSite: "Lax",
    });

    dispatch(
      login({
        user,
        jwt,
      })
    );
  } else {
    dispatch(logout());
  }
}
