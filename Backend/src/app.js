import express from "express";
import cors from "cors";
import prisma from "./config/db.js";
import authRoutes from "./modules/auth/auth.routes.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";
import captainRoutes from "./modules/captians/captain.routes.js";

import captainAuthRoutes from "./modules/captians/auth/captainAuth.routes.js";
import captainLocationRoutes from "./modules/captians/location/captainLocation.routes.js";
import rideRoutes from "./modules/rides/ride.routes.js";
import matchingRoutes from "./modules/matching/matching.routes.js";


const app = express();


app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/captains/auth", captainAuthRoutes);

app.use("/api/captains", captainRoutes);
app.use("/api/captains", captainLocationRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/matching", matchingRoutes);

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user,
  });
});
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
