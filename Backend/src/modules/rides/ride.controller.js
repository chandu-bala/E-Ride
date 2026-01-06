import prisma from "../../config/db.js";
import { createRideRequest } from "./ride.service.js";
export const requestRide = async (req, res) => {
  try {
    const {
      pickup,
      drop,
      passengerCount,
      passengerName,
      passengerPhone,
    } = req.body;

    if (!pickup || !drop) {
      return res.status(400).json({
        message: "Pickup and drop locations are required",
      });
    }

    if (passengerCount && passengerCount < 1) {
      return res.status(400).json({
        message: "Passenger count must be at least 1",
      });
    }
    let user;

if (passengerPhone) {
  // Try to find existing user
  user = await prisma.user.findUnique({
    where: { phoneNumber: passengerPhone },
  });

  // If not found, create new
  if (!user) {
    user = await prisma.user.create({
      data: {
        name: passengerName || "Guest",
        phoneNumber: passengerPhone,
      },
    });
  }
} else {
  // No phone provided → create temporary guest
  user = await prisma.user.create({
    data: {
      name: "Guest",
      phoneNumber: `guest-${Date.now()}`,
    },
  });
}


    const rideRequest = await createRideRequest({
      userId: user.id,
      pickup,
      drop,
      passengerCount,
    });

    res.status(201).json({
      message: "Ride request created successfully",
      rideRequest,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to create ride request",
      error: err.message,
    });
  }
};
