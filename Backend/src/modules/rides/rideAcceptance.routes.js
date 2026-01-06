import express from "express";
import {
  acceptRide,
  rejectRide,
} from "./rideAcceptance.controller.js";
import {
  authMiddleware,
  allowRoles,
} from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/accept",
  authMiddleware,
  allowRoles("CAPTAIN"),
  acceptRide
);

router.post(
  "/reject",
  authMiddleware,
  allowRoles("CAPTAIN"),
  rejectRide
);

export default router;
