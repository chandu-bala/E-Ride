import { saveCaptainLocation } from "./captainLocation.service.js";

export const updateCaptainLocation = async (req, res) => {
  try {
    const captainId = req.user.id;
    const { lat, lng } = req.body;

    if (typeof lat !== "number" || typeof lng !== "number") {
      return res.status(400).json({
        message: "Latitude and longitude must be numbers",
      });
    }

    await saveCaptainLocation(captainId, lat, lng);

    res.json({
      message: "Location updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update location",
      error: error.message,
    });
  }
};
