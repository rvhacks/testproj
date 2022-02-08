const router = require("express").Router();
const dataValidation = require("../validation");
const authController = require("../controller/auth");

router.post("/signup", dataValidation.signup, authController.signup);
router.post("/login", dataValidation.login, authController.login);

module.exports = router;
