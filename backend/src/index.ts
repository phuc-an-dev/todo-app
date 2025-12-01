// src/index.ts
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import "dotenv/config"; // Loads .env file

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "5001", 10);

// Middleware for parsing JSON body
app.use(express.json());

// A simple test route
app.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "API is running! Visit /api/users for user data." });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
