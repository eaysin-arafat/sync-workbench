import {
  EmployeeType,
  PostEmployeeRequest,
} from "@/constants/api-interface/employee";
import { ApiResponse } from "@/constants/api-interface/root";
import { API } from "../API/API";

const employeeApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @description create employee
     * @url /employees
     * @method POST
     */
    createEmployee: builder.mutation({
      query: (body: { data: PostEmployeeRequest }) => ({
        url: `/employees`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Employee"],
    }),

    /**
     * @description read all employees
     * @url /employees
     * @method GET
     */
    readEmployees: builder.query<ApiResponse<EmployeeType>, void>({
      query: () => `/employees?populate=*`,
      providesTags: ["Employee"],
    }),

    /**
     * @description read employee by ID
     * @url /employees/{id}
     * @method GET
     */
    readEmployeeById: builder.query<EmployeeType, string>({
      query: (id: string) => `/employees/${id}`,
      providesTags: ["Employee"],
    }),

    /**
     * @description update employee by ID
     * @url /employees/{id}
     * @method PUT
     */
    updateEmployee: builder.mutation({
      query: ({ id, body }: { id: string; body: EmployeeType }) => ({
        url: `/employees/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Employee"],
    }),

    /**
     * @description delete employee by ID
     * @url /employees/{id}
     * @method DELETE
     */
    deleteEmployee: builder.mutation({
      query: (id: string) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employee"],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useCreateEmployeeMutation,
  useReadEmployeesQuery,
  useReadEmployeeByIdQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;

// Export API endpoints
export const { endpoints: employeeApiEndpoints } = employeeApi;

// Export API
export default employeeApi;
