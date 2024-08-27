import { ProjectType } from "@/constants/api-interface/project";
import { API } from "../API/API";

const projectApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @description create project
     * @url /projects
     * @method POST
     */
    createProject: builder.mutation({
      query: (body: ProjectType) => ({
        url: `/projects`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Project"],
    }),

    /**
     * @description read all projects
     * @url /projects
     * @method GET
     */
    readProjects: builder.query<ProjectType[], void>({
      query: () => `/projects`,
      providesTags: ["Project"],
    }),

    /**
     * @description read project by ID
     * @url /projects/{id}
     * @method GET
     */
    readProjectById: builder.query<ProjectType, string>({
      query: (id: string) => `/projects/${id}`,
      providesTags: ["Project"],
    }),

    /**
     * @description update project by ID
     * @url /projects/{id}
     * @method PUT
     */
    updateProject: builder.mutation({
      query: ({ id, body }: { id: string; body: ProjectType }) => ({
        url: `/projects/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Project"],
    }),

    /**
     * @description delete project by ID
     * @url /projects/{id}
     * @method DELETE
     */
    deleteProject: builder.mutation({
      query: (id: string) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useCreateProjectMutation,
  useReadProjectsQuery,
  useReadProjectByIdQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;

// Export API endpoints
export const { endpoints: projectApiEndpoints } = projectApi;

// Export API
export default projectApi;
