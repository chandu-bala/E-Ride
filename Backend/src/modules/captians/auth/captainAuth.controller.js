import {
  requestCaptainOTP,
  verifyCaptainOTP,
} from "./captainAuth.service.js";

// POST /request-otp
export const requestOTPController = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone number required" });
    }

    const otp = await requestCaptainOTP(phoneNumber);

    res.json({
      message: "OTP sent successfully",
      otp, // ⚠️ remove in production
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// POST /verify-otp
export const verifyOTPController = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    if (!phoneNumber || !otp) {
      return res.status(400).json({ message: "Phone number & OTP required" });
    }

    const result = await verifyCaptainOTP(phoneNumber, otp);

    res.json({
      message: "Login successful",
      token: result.token,
      captain: {
        id: result.captain.id,
        name: result.captain.name,
        phoneNumber: result.captain.phoneNumber,
        isOnline: result.captain.isOnline,
      },
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
