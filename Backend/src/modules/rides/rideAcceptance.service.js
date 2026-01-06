import prisma from "../../config/db.js";

const generateRideOTP = () =>
  Math.floor(1000 + Math.random() * 9000).toString();

export const acceptRideRequest = async (rideRequestId, captainId) => {
  return prisma.$transaction(async (tx) => {
    // 1️⃣ Lock the ride request
    const updated = await tx.rideRequest.updateMany({
      where: {
        id: rideRequestId,
        status: "PENDING",
      },
      data: {
        status: "ACCEPTED",
      },
    });

    if (updated.count === 0) {
      throw new Error("Ride already accepted by another captain");
    }

    // 2️⃣ Fetch RideRequest to get userId
    const rideRequest = await tx.rideRequest.findUnique({
      where: { id: rideRequestId },
    });

    // 3️⃣ Generate ride OTP
    const otp = generateRideOTP();

    // 4️⃣ Create Ride (FIXED)
    const ride = await tx.ride.create({
      data: {
        rideRequestId,
        userId: rideRequest.userId,
        captainId,
        otp,                 // 👈 FIX HERE
        status: "ASSIGNED",
      },
    });

    return ride;
  });
};


// 👇 ADD THIS EXPORT
export const rejectRideRequest = async (rideRequestId, captainId) => {
  return {
    message: "Ride rejected",
    rideRequestId,
    captainId,
  };
};