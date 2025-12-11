// src/modules/user/user.controller.js

const userService = require("./user.service");

const me = async (req, res) => {
  try {
    const user = await userService.getById(req.userId);
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
};

const update = async (req, res) => {
  try {
    const updated = await userService.updateProfile(req.userId, req.body);
    res.json({ user: updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating user profile" });
  }
};

const updateUserLocation = async (req, res) => {
  try {
    const { lng, lat } = req.body;

    if (lng === undefined || lat === undefined) {
      return res.status(400).json({ message: "lng and lat are required" });
    }

    const updated = await userService.updateLocation(req.userId, lng, lat);
    res.json({ user: updated });
  } catch (err) {
    res.status(500).json({ message: "Error updating user location" });
  }
};

module.exports = {
  me,
  update,
  updateUserLocation,
};
