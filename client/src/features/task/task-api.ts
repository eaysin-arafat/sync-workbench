import { TaskType } from "@/constants/api-interface/task";
import { API } from "../API/API";

const taskApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @description create task
     * @url /tasks
     * @method POST
     */
    createTask: builder.mutation({
      query: (body: TaskType) => ({
        url: `/tasks`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Task"],
    }),

    /**
     * @description read all tasks
     * @url /tasks
     * @method GET
     */
    readTasks: builder.query<TaskType[], void>({
      query: () => `/tasks`,
      providesTags: ["Task"],
    }),

    /**
     * @description read task by ID
     * @url /tasks/{id}
     * @method GET
     */
    readTaskById: builder.query<TaskType, string>({
      query: (id: string) => `/tasks/${id}`,
      providesTags: ["Task"],
    }),

    /**
     * @description update task by ID
     * @url /tasks/{id}
     * @method PUT
     */
    updateTask: builder.mutation({
      query: ({ id, body }: { id: string; body: TaskType }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Task"],
    }),

    /**
     * @description delete task by ID
     * @url /tasks/{id}
     * @method DELETE
     */
    deleteTask: builder.mutation({
      query: (id: string) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useCreateTaskMutation,
  useReadTasksQuery,
  useReadTaskByIdQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;

// Export API endpoints
export const { endpoints: taskApiEndpoints } = taskApi;

// Export API
export default taskApi;
