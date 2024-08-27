import { API } from "../API/API";

const permissionsApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @description getPermissions
     * @url /permissions
     * @method GET
     */
    getPermissions: builder.query({
      query: () => ({
        url: `/permissions`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPermissionsQuery } = permissionsApi;
export const { endpoints: permissionsApiEndpoints } = permissionsApi;
export default permissionsApi;
