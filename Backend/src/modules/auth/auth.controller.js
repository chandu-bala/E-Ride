import { requestOTP, verifyOTP } from "./auth.service.js";

export const sendOTP = async (req, res) => {
  try {
    const { phoneNumber, role } = req.body;

    if (!phoneNumber || !role) {
      return res.status(400).json({ message: "Phone number & role required" });
    }

    const otp = await requestOTP(phoneNumber, role);

    res.json({
      message: "OTP sent successfully",
      otp, // ⚠️ remove in production
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyOTPController = async (req, res) => {
  try {
    const { phoneNumber, role, otp } = req.body;

    const token = await verifyOTP(phoneNumber, role, otp);

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
