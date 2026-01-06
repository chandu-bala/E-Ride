import express from "express";
import { updateCaptainLocation } from "./captainLocation.controller.js";
import {
  authMiddleware,
  allowRoles,
} from "../../../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/location",
  authMiddleware,
  allowRoles("CAPTAIN"),
  updateCaptainLocation
);

export default router;
