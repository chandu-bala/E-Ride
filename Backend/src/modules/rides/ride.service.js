import prisma from "../../config/db.js";

// TEMP distance calculation (later replaced by Maps)
const calculateDistance = () => 1200; // meters
const calculateFare = (distance) => Math.ceil(distance / 100) * 5;
export const createRideRequest = async ({
  userId,
  pickup,
  drop,
  passengerCount,
}) => {
  const distance = calculateDistance();
  const fare = calculateFare(distance);

  return prisma.rideRequest.create({
    data: {
      userId,
      pickupLat: pickup.lat,
      pickupLng: pickup.lng,
      dropLat: drop.lat,
      dropLng: drop.lng,
      passengerCount: passengerCount || 1,
      estimatedDistance: distance,
      estimatedFare: fare,
    },
  });
};
