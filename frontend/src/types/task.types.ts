const TASK_STATUS = {
  ACTIVE: "active",
  COMPLETED: "completed",
} as const;

type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];

interface Task {
  _id: string;
  title: string;
  status: TaskStatus;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface TasksResponse {
  tasks: Task[];
  activeCount: number;
  completedCount: number;
}

interface CreateTaskPayload {
  title: string;
}

interface UpdateTaskPayload {
  title?: string;
  status?: TaskStatus;
}

type DateFilter = "today" | "week" | "month" | "all";

export {
  TASK_STATUS,
  type TaskStatus,
  type Task,
  type TasksResponse,
  type CreateTaskPayload,
  type UpdateTaskPayload,
  type DateFilter,
};
