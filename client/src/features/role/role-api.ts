import { API } from "../API/API";

const roleApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @description createRole
     * @url /roles
     * @method POST
     */
    createRole: builder.mutation({
      query: (body) => ({
        url: `/roles`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Role"],
    }),

    /**
     * @description deleteRole
     * @url /roles/:id
     * @method DELETE
     */
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Role"],
    }),

    /**
     * @description findRoles
     * @url /roles
     * @method GET
     */
    findRoles: builder.query({
      query: () => ({
        url: `/roles`,
        method: "GET",
      }),
      providesTags: ["Role"],
    }),

    /**
     * @description findOneRole
     * @url /roles/:id
     * @method GET
     */
    findOneRole: builder.query({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "GET",
      }),
      providesTags: ["Role"],
    }),

    /**
     * @description updateRole
     * @url /roles/:id
     * @method PUT
     */
    updateRole: builder.mutation({
      query: ({ id, body }) => ({
        url: `/roles/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Role"],
    }),
  }),
});

export const {
  useCreateRoleMutation,
  useDeleteRoleMutation,
  useFindRolesQuery,
  useFindOneRoleQuery,
  useUpdateRoleMutation,
} = roleApi;

export const { endpoints: roleApiEndpoints } = roleApi;
export default roleApi;
