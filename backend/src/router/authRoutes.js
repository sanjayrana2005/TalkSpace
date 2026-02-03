const express = require("express");
const { signupController, loginController, logoutController, updateProfile } = require("../controller/authController");
const protectRoute = require("../middleware/auth");
const authRouter = express.Router();
const upload = require("../utils/multer");
const arcjectProtection = require("../middleware/arcjet-middleware");

authRouter.use(arcjectProtection);

authRouter.post("/signup",signupController);
authRouter.post("/login",loginController);
authRouter.post("/logout",logoutController);

authRouter.post("/update-profile",protectRoute,upload.single("profileImage"),updateProfile);

authRouter.get("/check",protectRoute,(req,res)=>res.status(200).json(req.user));

module.exports = authRouter;
