import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest.js";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "./task.controller.js";
import {
  createTaskSchema,
  taskIdSchema,
  updateTaskSchema,
} from "./task.validation.js";

const taskRouter: Router = Router();

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
