const express = require("express");
const passport = require("passport");
const { createUserController, logginUserController, checkAuthController, logoutController } = require("../controller/authController");

const router = express.Router();

router.post("/signup", createUserController);
router.post("/login", passport.authenticate('local'), logginUserController);
router.get("/check", passport.authenticate('jwt',{ session: false }), checkAuthController);
router.get("/logout", logoutController);

module.exports = router;