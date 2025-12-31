import express from "express";
import cors from "cors";
import prisma from "./config/db.js";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();


app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// Health check
app.get("/", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: "OK",
      message: "⚡ VoltRide backend is live & DB connected",
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: "Database connection failed",
    });
  }
});

export default app;
