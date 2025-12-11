
const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ status: "RTC signaling running" });
});

module.exports = router;
