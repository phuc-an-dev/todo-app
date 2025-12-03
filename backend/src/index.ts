import cors from "cors";
import "dotenv/config";
import express from "express";
import connectDB from "./config/db";
import taskRouter from "./modules/tasks/task.route";

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use("/api/tasks", taskRouter);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API is running!" });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
