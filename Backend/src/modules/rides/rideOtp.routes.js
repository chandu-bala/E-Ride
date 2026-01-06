import express from "express";
import { verifyRideOtp } from "./rideOtp.controller.js";
import {
  authMiddleware,
  allowRoles,
} from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/verify-otp",
  authMiddleware,
  allowRoles("CAPTAIN"),
  verifyRideOtp
);

export default router;
