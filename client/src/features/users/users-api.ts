import { User } from "@/constants/api-interface/user";
import { API } from "../API/API";

const userApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @description count users
     * @url /users/count
     * @method GET
     */
    countUsers: builder.query({
      query: () => ({
        url: `/users/count`,
        method: "GET",
      }),
    }),

    /**
     * @description create user
     * @url /users
     * @method POST
     */
    createUser: builder.mutation({
      query: (body) => ({
        url: `/users`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    /**
     * @description destroy user
     * @url /users/:id
     * @method DELETE
     */
    destroyUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    /**
     * @description find users
     * @url /users
     * @method GET
     */
    findUsers: builder.query<User[], void>({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    /**
     * @description find one user
     * @url /users/:id
     * @method GET
     */
    findOneUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    /**
     * @description update user
     * @url /users/:id
     * @method PUT
     */
    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    /**
     * @description get the logged-in user's information
     * @url /users/me
     * @method GET
     */
    getMe: builder.query({
      query: () => ({
        url: `/users/me`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCountUsersQuery,
  useCreateUserMutation,
  useDestroyUserMutation,
  useFindUsersQuery,
  useFindOneUserQuery,
  useUpdateUserMutation,
  useGetMeQuery,
} = userApi;

export const { endpoints: userApiEndpoints } = userApi;
export default userApi;
