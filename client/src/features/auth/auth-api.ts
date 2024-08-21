import { User } from "@/constants/api-interface/user";
import { cookieManager } from "@/utils/cookie-manager";
import { handleAuthResponse } from "@/utils/handle-auth-response";
import { API } from "../API/API";
import { login, logout } from "./auth-slice";

interface UserResponse {
  jwt: string;
  user: User;
}

interface LoginPayload {
  identifier: string;
  password: string;
}

interface ReadUserResponse {
  data: User;
  meta: { request: {}; response: {} };
}

export const authApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @description Read the current user's information
     * @returns User
     */
    readUser: builder.query<ReadUserResponse, void>({
      query: () => "/users/me",
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        const { data: user } = await queryFulfilled;

        const jwt = cookieManager.getCookie("jwtToken");

        if (user) {
          dispatch(
            login({
              isLoggedIn: true,
              user,
              jwt,
            })
          );
        } else {
          dispatch(logout());
        }
      },
    }),
    /**
     * @description This endpoint is used to create user account
     * @param body
     * @returns UserAccount
     */
    registrationUser: builder.mutation<UserResponse, SignInDataType>({
      query: (body: SignInDataType) => ({
        url: "/auth/local/register",
        method: "POST",
        body,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;
        handleAuthResponse(result, dispatch);
      },
    }),
    /**
     * @Description login user
     * @URI /user-account/login
     * @Method POST
     */
    loginUser: builder.mutation<UserResponse, LoginPayload>({
      query: (body: LoginPayload) => ({
        url: "/auth/local",
        method: "POST",
        body,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;
        handleAuthResponse(result, dispatch);
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useReadUserQuery,
  useRegistrationUserMutation,
} = authApi;
export default authApi;
