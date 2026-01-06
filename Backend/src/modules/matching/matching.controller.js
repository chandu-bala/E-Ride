import { findNearbyCaptains } from "./matching.service.js";

export const matchRideRequest = async (req, res) => {
  try {
    const { rideRequestId, pickupLat, pickupLng, passengerCount } = req.body;

    const result = await findNearbyCaptains(
      pickupLat,
      pickupLng,
      passengerCount
    );

    if (!result) {
      return res.json({
        message: "No captains available nearby",
      });
    }

    // TEMP: simulate notification
    const notifiedCaptains = result.captains.map((c) => ({
      id: c.id,
      name: c.name,
      phoneNumber: c.phoneNumber,
    }));

    res.json({
      message: "Nearby captains found",
      searchRadiusMeters: result.radius,
      passengerCount,
      captainsNotified: notifiedCaptains,
    });
  } catch (err) {
    res.status(500).json({
      message: "Matching failed",
      error: err.message,
    });
  }
};
