import type {
  CreateTaskPayload,
  DateFilter,
  Task,
  TasksResponse,
  UpdateTaskPayload,
} from "@/types/task.types";
import axiosInstance from "../lib/axios";

const tasksApi = {
  // Get all tasks with filter
  getTasks: async (filter: DateFilter = "today"): Promise<TasksResponse> => {
    const response = await axiosInstance.get<TasksResponse>("/tasks", {
      params: { filter },
    });
    return response.data;
  },

  // Create new task
  createTask: async (payload: CreateTaskPayload): Promise<Task> => {
    const response = await axiosInstance.post<{ message: string; task: Task }>(
      "/tasks",
      payload
    );
    return response.data.task;
  },

  // Update task
  updateTask: async (id: string, payload: UpdateTaskPayload): Promise<Task> => {
    const response = await axiosInstance.patch<{ message: string; task: Task }>(
      `/tasks/${id}`,
      payload
    );
    return response.data.task;
  },

  // Delete task
  deleteTask: async (id: string): Promise<Task> => {
    const response = await axiosInstance.delete<{
      message: string;
      task: Task;
    }>(`/tasks/${id}`);
    return response.data.task;
  },
};

export { tasksApi };
