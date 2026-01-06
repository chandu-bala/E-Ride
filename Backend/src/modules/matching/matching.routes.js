import express from "express";
import { matchRideRequest } from "./matching.controller.js";

const router = express.Router();

router.post("/match", matchRideRequest);

export default router;
