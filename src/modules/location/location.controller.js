
const locationService = require("./location.service");

const updateMe = async (req, res) => {
  try {
    const { lng, lat } = req.body;

    if (lng === undefined || lat === undefined) {
      return res.status(400).json({ message: "lng and lat are required" });
    }

    const result = await locationService.updateLocation(
      req.userId,
      parseFloat(lng),
      parseFloat(lat)
    );

    res.json({
      message: "Location updated",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update location" });
  }
};

const nearby = async (req, res) => {
  try {
    const { lng, lat, radius } = req.query;

    const users = await locationService.findNearby(
      parseFloat(lng),
      parseFloat(lat),
      parseInt(radius || "500")
    );

    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch nearby users" });
  }
};

module.exports = { updateMe, nearby };
