import { DepartmentType } from "@/constants/api-interface/department";
import { RootResponse } from "@/constants/api-interface/root";
import { buildQueryURL, QueryParams } from "@/utils/get-query-params";
import { API } from "../API/API";

const departmentApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @description create department
     * @uri /departments
     * @method POST
     */
    createDepartment: builder.mutation({
      query: (body: { data: DepartmentType }) => ({
        url: `/departments`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Department"],
    }),

    /**
     * @Description read all departments
     * @uri /departments
     * @method GET
     */
    readDepartments: builder.query<RootResponse<DepartmentType>, QueryParams>({
      query: (queryParams: QueryParams) => {
        return buildQueryURL(`/departments`, queryParams);
      },
      providesTags: ["Department"],
    }),

    /**
     * @description read department by ID
     * @uri /departments/{id}
     * @method GET
     */
    readDepartmentById: builder.query({
      query: (id: string) => `/departments/${id}`,
      providesTags: ["Department"],
    }),

    /**
     * @description update department
     * @uri /departments/{id}
     * @method PUT
     */
    updateDepartment: builder.mutation({
      query: ({ id, body }: { id: string; body: DepartmentType }) => ({
        url: `/departments/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Department"],
    }),

    /**
     * @description delete department
     * @uri /departments/{id}
     * @method DELETE
     */
    deleteDepartment: builder.mutation({
      query: (id: string) => ({
        url: `/departments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Department"],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useCreateDepartmentMutation,
  useReadDepartmentsQuery,
  useReadDepartmentByIdQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApi;

// Export API endpoints
export const { endpoints: departmentApiEndpoints } = departmentApi;

// Export API
export default departmentApi;
