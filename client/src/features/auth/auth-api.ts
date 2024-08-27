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

    /**
     * @description callback
     * @url /auth/callback
     * @method POST
     */
    callback: builder.mutation({
      query: (provider) => ({
        url: `/auth/${provider}/callback`,
        method: "POST",
      }),
    }),

    /**
     * @description connect
     * @url /auth/connect
     * @method POST
     */
    connect: builder.mutation({
      query: (provider) => ({
        url: `/auth/${provider}/connect`,
        method: "POST",
      }),
    }),

    /**
     * @description forgotPassword
     * @url /auth/forgot-password
     * @method POST
     */
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        body,
      }),
    }),

    /**
     * @description resetPassword
     * @url /auth/reset-password
     * @method POST
     */
    resetPassword: builder.mutation({
      query: (body) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body,
      }),
    }),

    /**
     * @description changePassword
     * @url /auth/change-password
     * @method POST
     */
    changePassword: builder.mutation({
      query: (body) => ({
        url: `/auth/change-password`,
        method: "POST",
        body,
      }),
    }),

    /**
     * @description emailConfirmation
     * @url /auth/email-confirmation
     * @method POST
     */
    emailConfirmation: builder.mutation({
      query: (confirmationCode) => ({
        url: `/auth/email-confirmation`,
        method: "POST",
        body: { confirmationCode },
      }),
    }),

    /**
     * @description register
     * @url /auth/register
     * @method POST
     */
    register: builder.mutation({
      query: (body) => ({
        url: `/auth/register`,
        method: "POST",
        body,
      }),
    }),

    /**
     * @description sendEmailConfirmation
     * @url /auth/send-email-confirmation
     * @method POST
     */
    sendEmailConfirmation: builder.mutation({
      query: (body) => ({
        url: `/auth/send-email-confirmation`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useReadUserQuery,
  useRegistrationUserMutation,
  useCallbackMutation,
  useChangePasswordMutation,
  useConnectMutation,
  useEmailConfirmationMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useSendEmailConfirmationMutation,
  useRegisterMutation,
} = authApi;
export default authApi;
