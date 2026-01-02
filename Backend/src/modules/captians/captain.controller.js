import {
  createCaptain,
  getCaptainByPhone,
  updateCaptainStatus,
} from "./captain.service.js";

export const registerCaptain = async (req, res) => {
  try {
    const captain = await createCaptain(req.body);
    res.status(201).json({ captain });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const fetchCaptainByPhone = async (req, res) => {
  const { phone } = req.query;
  const captain = await getCaptainByPhone(phone);

  if (!captain) {
    return res.status(404).json({ message: "Captain not found" });
  }

  res.json({ captain });
};

export const setCaptainOnlineStatus = async (req, res) => {
  const { captainId, isOnline } = req.body;

  const captain = await updateCaptainStatus(captainId, isOnline);
  res.json({ captain });
};
