import prisma from "../../config/db.js";

export const createCaptain = async (data) => {
  const existing = await prisma.captain.findUnique({
    where: { phoneNumber: data.phoneNumber },
  });

  if (existing) {
    throw new Error("Captain already exists");
  }

  return prisma.captain.create({
    data,
  });
};

export const getCaptainByPhone = async (phoneNumber) => {
  return prisma.captain.findUnique({
    where: { phoneNumber },
  });
};

export const updateCaptainStatus = async (captainId, isOnline) => {
  return prisma.captain.update({
    where: { id: captainId },
    data: { isOnline },
  });
};
