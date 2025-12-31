import prisma from "../../config/db.js";
import { generateOTP, generateToken } from "./auth.utils.js";

// STEP 1: Request OTP
export const requestOTP = async (phoneNumber, role) => {
  const otp = generateOTP();

  if (role === "USER") {
    await prisma.user.upsert({
      where: { phoneNumber },
      update: {},
      create: { phoneNumber },
    });
  }

  if (role === "CAPTAIN") {
    await prisma.captain.upsert({
      where: { phoneNumber },
      update: {},
      create: {
        phoneNumber,
        name: "Captain",
      },
    });
  }

  // ⚠️ For now we return OTP (SMS later)
  return otp;
};

// STEP 2: Verify OTP
export const verifyOTP = async (phoneNumber, role, otp) => {
  // 🔴 TEMP: accept any OTP (we’ll tighten later)

  let user;
  if (role === "USER") {
    user = await prisma.user.findUnique({ where: { phoneNumber } });
  }

  if (role === "CAPTAIN") {
    user = await prisma.captain.findUnique({ where: { phoneNumber } });
  }

  if (!user) throw new Error("User not found");

  const token = generateToken({
    id: user.id,
    role,
  });

  return token;
};
