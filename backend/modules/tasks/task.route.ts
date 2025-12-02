import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest.ts";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "./task.controller.ts";
import {
  createTaskSchema,
  taskIdSchema,
  updateTaskSchema,
} from "./task.validation.ts";

const taskRouter = Router();

taskRouter.get("/", getAllTasks);

taskRouter.post("/", validateRequest(createTaskSchema), createTask);

taskRouter.patch(
  "/:id",
  validateRequest(taskIdSchema, "params"),
  validateRequest(updateTaskSchema),
  updateTask
);

taskRouter.delete("/:id", validateRequest(taskIdSchema, "params"), deleteTask);

export default taskRouter;
