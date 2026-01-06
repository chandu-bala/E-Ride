import prisma from "../../config/db.js";

const toRad = (value) => (value * Math.PI) / 180;

const calculateDistanceMeters = (lat1, lng1, lat2, lng2) => {
  const R = 6371000; // Earth radius in meters
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

export const findNearbyCaptains = async (
  pickupLat,
  pickupLng,
  passengerCount
) => {
  const ONLINE_CAPTAINS = await prisma.captain.findMany({
    where: {
      isOnline: true,
      lastKnownLat: { not: null },
      lastKnownLng: { not: null },
    },
  });

  const MAX_RADIUS = 2000;
  const STEP = 100;

  for (let radius = 100; radius <= MAX_RADIUS; radius += STEP) {
    const matches = ONLINE_CAPTAINS.filter((c) => {
      const dist = calculateDistanceMeters(
        pickupLat,
        pickupLng,
        c.lastKnownLat,
        c.lastKnownLng
      );
      return dist <= radius;
    });

    if (matches.length > 0) {
      return {
        radius,
        captains: matches,
      };
    }
  }

  return null;
};
