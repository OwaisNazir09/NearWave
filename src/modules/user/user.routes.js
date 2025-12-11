
const router = require("express").Router();
const controller = require("./user.controller");
const auth = require("../../middlewares/auth.middleware");

router.get("/me", auth, controller.me);
router.put("/me", auth, controller.update);
router.post("/me/location", auth, controller.updateUserLocation);

module.exports = router;
