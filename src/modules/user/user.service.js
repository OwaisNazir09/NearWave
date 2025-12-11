// src/modules/user/user.service.js

const User = require("./user.model");

const getById = async (id) => {
  return User.findById(id).select("-password");
};

const updateProfile = async (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true }).select("-password");
};

// For map / location updates
const updateLocation = async (id, lng, lat) => {
  return User.findByIdAndUpdate(
    id,
    {
      location: {
        type: "Point",
        coordinates: [parseFloat(lng), parseFloat(lat)],
      },
    },
    { new: true }
  ).select("-password");
};

module.exports = {
  getById,
  updateProfile,
  updateLocation,
};
