import { verifyRideOtpAndStart } from "./rideOtp.service.js";

export const verifyRideOtp = async (req, res) => {
  try {
    const captainId = req.user.id;
    const { rideId, otp } = req.body;

    if (!rideId || !otp) {
      return res.status(400).json({
        message: "Ride ID and OTP are required",
      });
    }

    const ride = await verifyRideOtpAndStart(
      rideId,
      otp,
      captainId
    );

    res.json({
      message: "OTP verified. Ride started",
      ride,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
