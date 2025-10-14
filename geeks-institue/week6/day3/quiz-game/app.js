import express from "express";
import cors from "cors";
import quizRoutes from "./server/routes/quizRoutes.js";
import pool from "./server/config/db.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/quiz", quizRoutes);

// Test connection
pool
  .connect()
  .then(() => console.log("✅ PostgreSQL Connected!"))
  .catch((err) => console.error("❌ Connection error:", err));

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
