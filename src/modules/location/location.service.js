
const User = require("../user/user.model");
const LocationLog = require("./location.model");

const updateLocation = async (userId, lng, lat) => {
  await User.findByIdAndUpdate(userId, {
    location: { type: "Point", coordinates: [lng, lat] },
  });

  return LocationLog.create({
    userId,
    coordinates: [lng, lat],
  });
};

const findNearby = async (lng, lat, radius = 500) => {
  return User.find({
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [lng, lat] },
        $maxDistance: radius, 
      },
    },
  }).select("-password");
};

module.exports = {
  updateLocation,
  findNearby,
};
