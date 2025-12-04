import { type ValueOf } from "../../utils/types.js";

const TASK_STATUS = {
  ACTIVE: "active",
  COMPLETED: "completed",
} as const;

type TaskStatus = ValueOf<typeof TASK_STATUS>;

const TASK_STATUS_ARRAY = Object.values(TASK_STATUS);

const FACET = {
  TASKS: "tasks",
  ACTIVE: "activeCount",
  COMPLETED: "completedCount",
} as const;

export { TASK_STATUS, TASK_STATUS_ARRAY, type TaskStatus, FACET };
