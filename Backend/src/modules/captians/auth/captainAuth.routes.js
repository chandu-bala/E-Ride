import express from "express";
import {
  requestOTPController,
  verifyOTPController,
} from "./captainAuth.controller.js";

const router = express.Router();

router.post("/request-otp", requestOTPController);
router.post("/verify-otp", verifyOTPController);

export default router;
