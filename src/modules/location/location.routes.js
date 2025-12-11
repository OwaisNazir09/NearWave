const router = require("express").Router();
const controller = require("./location.controller");
const auth = require("../../middlewares/auth.middleware");

router.post("/me", auth, controller.updateMe);

router.get("/nearby", auth, controller.nearby);

module.exports = router;
