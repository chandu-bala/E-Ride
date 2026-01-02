import prisma from "../../../config/db.js";
import jwt from "jsonwebtoken";

// In-memory OTP store (TEMP)
const otpStore = new Map();

const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// 1️⃣ Request OTP
export const requestCaptainOTP = async (phoneNumber) => {
  const captain = await prisma.captain.findUnique({
    where: { phoneNumber },
  });

  if (!captain) {
    throw new Error("Captain not found. Please register first.");
  }

  const otp = generateOTP();
  const expiresAt = Date.now() + OTP_EXPIRY_MS;

  otpStore.set(phoneNumber, { otp, expiresAt });

  // ⚠️ SMS will be integrated later
  return otp;
};

// 2️⃣ Verify OTP & issue JWT
export const verifyCaptainOTP = async (phoneNumber, otp) => {
  const record = otpStore.get(phoneNumber);

  if (!record) {
    throw new Error("OTP not requested");
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(phoneNumber);
    throw new Error("OTP expired");
  }

  if (record.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  otpStore.delete(phoneNumber);

  const captain = await prisma.captain.findUnique({
    where: { phoneNumber },
  });

  const token = jwt.sign(
    {
      id: captain.id,
      role: "CAPTAIN",
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { token, captain };
};
