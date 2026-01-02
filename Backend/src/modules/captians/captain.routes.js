import express from "express";
import {
  registerCaptain,
  fetchCaptainByPhone,
  setCaptainOnlineStatus,
} from "./captain.controller.js";

const router = express.Router();

router.post("/register", registerCaptain);
router.get("/by-phone", fetchCaptainByPhone);
router.post("/status", setCaptainOnlineStatus);

export default router;
