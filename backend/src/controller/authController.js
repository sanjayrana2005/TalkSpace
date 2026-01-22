const userModel = require("../models/userModel");
const bcrypt = require("bcrypt")
const { signupValidation } = require("../validator/authValidation");
const generateToken = require("../config/generateToken");
require("dotenv").config();

const signupController = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        signupValidation(req);
        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                message: "Email already exists"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await userModel.create({
            fullName, email, password: hashPassword
        });

        const token = generateToken(user._id);

        res.cookie("talkSpace", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "development" ? false : true
        })

        res.status(201).json({
            message: "Registered successfully",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profileImage: user.profileImage
            }
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}
const loginController = async (req, res) => {

}
const logoutController = async (req, res) => {

}

module.exports = {
    signupController,
    loginController,
    logoutController
}