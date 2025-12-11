const express = require("express");
const router = express.Router();

const authRoutes = require("../modules/auth/auth.routes");
const userRoutes = require("../modules/user/user.routes");
const locationRoutes = require("../modules/location/location.routes");
const chatRoutes = require("../modules/chat/chat.routes");
const rtcRoutes = require("../modules/rtc/rtc.routes");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/location", locationRoutes);
router.use("/chat", chatRoutes);
router.use("/rtc", rtcRoutes);

module.exports = router;
