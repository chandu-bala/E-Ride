import {
  acceptRideRequest,
  rejectRideRequest,
} from "./rideAcceptance.service.js";

export const acceptRide = async (req, res) => {
  try {
    const captainId = req.user.id;
    const { rideRequestId } = req.body;

    const ride = await acceptRideRequest(rideRequestId, captainId);

    res.json({
      message: "Ride accepted successfully",
      ride,
    });
  } catch (err) {
    res.status(409).json({
      message: err.message,
    });
  }
};

export const rejectRide = async (req, res) => {
  const captainId = req.user.id;
  const { rideRequestId } = req.body;

  const result = await rejectRideRequest(rideRequestId, captainId);

  res.json(result);
};
