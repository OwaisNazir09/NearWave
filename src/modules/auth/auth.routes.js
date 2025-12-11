const router = require("express").Router();
const controller = require("./auth.controller");

console.log("i am connected");

router.post("/register", controller.register);
router.post("/login", controller.login);

module.exports = router;
