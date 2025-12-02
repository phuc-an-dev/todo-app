import type { Request, Response } from "express";
import { getDateRange, type DateFilter } from "../../utils/date.utils.ts";
import { FACET, TASK_STATUS, type TaskStatus } from "./task.constant.ts";
import Task from "./task.model.ts";

const getAllTasks = async (req: Request, res: Response) => {
  // Extract filter from query parameters
  const { filter = "today" } = req.query as { filter?: DateFilter };
  // Get date range based on filter
  const { start, end } = getDateRange(filter);
  // Build match query
  const matchQuery = start
    ? end
      ? { createdAt: { $gte: start, $lte: end } }
      : { createdAt: { $gte: start } }
    : {};
  // Execute aggregation pipeline
  try {
    const [result] = await Task.aggregate([
      { $match: matchQuery },
      {
        $facet: {
          [FACET.TASKS]: [{ $sort: { createdAt: -1 } }],
          [FACET.ACTIVE]: [
            { $match: { status: TASK_STATUS.ACTIVE } },
            { $count: "count" },
          ],
          [FACET.COMPLETED]: [
            { $match: { status: TASK_STATUS.COMPLETED } },
            { $count: "count" },
          ],
        },
      },
    ]);
    // Extract results
    const tasks = result[FACET.TASKS] ?? [];
    const activeCount = result[FACET.ACTIVE][0]?.count ?? 0;
    const completedCount = result[FACET.COMPLETED][0]?.count ?? 0;
    // Send the response
    res.status(200).json({ tasks, activeCount, completedCount });
  } catch (error) {
    // Handle errors
    console.error("Error when getAllTasks", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const createTask = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const task = new Task({ title });
    await task.save();
    res.status(201).json({ message: "Task created", task });
  } catch (error) {
    console.error("Error when createTask", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    // Build the update object dynamically
    const updateField: {
      title?: string;
      status?: TaskStatus;
      completedAt?: Date;
    } = {};
    const { title, status } = req.body;
    // Only add fields that are provided
    if (title) {
      updateField["title"] = title;
    }
    if (status) {
      updateField.status = status;
      // Set completedAt based on status
      if (status === TASK_STATUS.COMPLETED) {
        updateField["completedAt"] = new Date();
      }
    }
    // Find the task by ID and update
    const { id } = req.params;
    const updateTask = await Task.findByIdAndUpdate(id, updateField, {
      new: true,
    });
    // If task not found, return 404
    if (!updateTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    // Send the updated task in the response
    res.status(200).json({ message: "Task updated", task: updateTask });
  } catch (error) {
    console.error("Error when updateTask", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    // If task not found, return 404
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted", task: deletedTask });
  } catch (error) {
    console.error("Error when deleteTask", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export { createTask, deleteTask, getAllTasks, updateTask };
