const express = require("express");
const { signupController, loginController, logoutController, updateProfile } = require("../controller/authController");
const protectRoute = require("../middleware/auth");
const authRouter = express.Router();
const upload = require("../utils/multer");

authRouter.post("/signup",signupController);
authRouter.post("/login",loginController);
authRouter.post("/logout",logoutController);

authRouter.post("/update-profile",protectRoute,upload.single("profileImage"),updateProfile);

module.exports = authRouter;
