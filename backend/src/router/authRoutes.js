const express = require("express");
const { signupController, loginController, logoutController, updateProfile } = require("../controller/authController");
const protectRoute = require("../middleware/auth");
const authRouter = express.Router();

authRouter.post("/signup",signupController);
authRouter.post("/login",loginController);
authRouter.post("/logout",logoutController);

authRouter.post("/update-profile",protectRoute,updateProfile);

module.exports = authRouter;
