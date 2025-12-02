import mongoose, { Document, Schema } from "mongoose";
import {
  TASK_STATUS,
  TASK_STATUS_ARRAY,
  type TaskStatus,
} from "./task.constant.ts";

interface ITask extends Document {
  title: string;
  status: TaskStatus;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: TASK_STATUS_ARRAY,
      default: TASK_STATUS.ACTIVE,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model<ITask>("Task", taskSchema);
export default Task;
