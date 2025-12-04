// backend/src/index.ts
import cors from "cors";
import "dotenv/config";
import express from "express";
import path from "path";
import taskRouter from "./modules/tasks/task.route.js";
import connectDB from "./config/db.js";
import { fileURLToPath } from "url";

// Initialize Express app
const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(express.json());

// Enable CORS in development mode
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: "http://localhost:5173" }));
}

// API Routes
app.use("/api/tasks", taskRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

// Connect to the database and start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
