import express from "express";
import { requestRide } from "./ride.controller.js";

const router = express.Router();

// PUBLIC – passenger can request ride without login
router.post("/request", requestRide);

export default router;
