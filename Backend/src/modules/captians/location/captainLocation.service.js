import prisma from "../../../config/db.js";

// Save captain live location
export const saveCaptainLocation = async (captainId, lat, lng) => {
  // 1. Update captain's last known location (optional)
  await prisma.captain.update({
    where: { id: captainId },
    data: {
      lastKnownLat: lat,
      lastKnownLng: lng,
    },
  });

  // 2. Save location history
  return prisma.captainLocation.create({
    data: {
      captainId,
      lat,
      lng,
    },
  });
};

// Get latest location (used later for matching)
export const getLatestCaptainLocation = async (captainId) => {
  return prisma.captainLocation.findFirst({
    where: { captainId },
    orderBy: { timestamp: "desc" },
  });
};
