import "dotenv/config";
import express, { type Application } from "express";
import connectDB from "../config/db.ts";
import taskRouter from "../modules/tasks/task.route.ts";

// Initialize Express app
const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "5001", 10);

// Middleware for parsing JSON body
app.use(express.json());

// Task routes
app.use("/api/tasks", taskRouter);

// Start server after DB connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
