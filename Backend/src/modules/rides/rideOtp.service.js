import prisma from "../../config/db.js";

export const verifyRideOtpAndStart = async (
  rideId,
  enteredOtp,
  captainId
) => {
  return prisma.$transaction(async (tx) => {
    // 1️⃣ Fetch ride
    const ride = await tx.ride.findUnique({
      where: { id: rideId },
    });

    if (!ride) {
      throw new Error("Ride not found");
    }

    // 2️⃣ Security checks
    if (ride.captainId !== captainId) {
      throw new Error("Unauthorized captain");
    }

    if (ride.status !== "ASSIGNED") {
      throw new Error("Ride is not in ASSIGNED state");
    }

    // 3️⃣ OTP check
    if (ride.otp !== enteredOtp) {
      throw new Error("Invalid OTP");
    }

    // 4️⃣ Start ride
    const updatedRide = await tx.ride.update({
      where: { id: rideId },
      data: {
        status: "ONGOING",
        startTime: new Date(),
      },
    });

    return updatedRide;
  });
};
