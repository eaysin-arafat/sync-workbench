import { logout } from "@/features/auth/auth-slice";
import { cookieManager } from "@/utils/cookie-manager";
import { Dispatch } from "@reduxjs/toolkit";
import { decodeToken } from "./decode-token";

export async function handleAuthResponse(token: string, dispatch: Dispatch) {
  console.log("======", token);
  if (token) {
    cookieManager.saveCookie("accessToken", token, {
      sameSite: "Lax",
    });
    const decoded = decodeToken(token);
    console.log({ decoded });

    // dispatch(
    //   login({
    //     user,
    //     jwt,
    //   })
    // );
  } else {
    dispatch(logout());
  }
}
