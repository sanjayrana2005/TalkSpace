const userModel = require("../models/userModel");
const bcrypt = require("bcrypt")
const { signupValidation, loginValidation } = require("../validator/authValidation");
const generateToken = require("../config/generateToken");
const { sendMail } = require("../utils/nodemailer");
require("dotenv").config();

const signupController = async (req, res) => {
    let { fullName, email, password } = req.body;
    try {
        signupValidation(req);
        
        email = email.toLowerCase();

        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                message: "Email already exists"
            });
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
        });
        const subject = "Welcome to TalkSpace 🎉"
        sendMail(email,fullName,subject);

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
    let { email, password } = req.body;
    try {
        loginValidation(req);
        email=email.toLowerCase();
        const isUser = await userModel.findOne({email}).select("+password");

        if (!isUser) {
            return res.status(400).json({
                message: "user not exist"
            })
        }

        const matchPassword = await bcrypt.compare(password, isUser.password);

            if (!matchPassword) {
            return res.status().json({
                message: "Invalid credentials"
            });
        }

        const token = generateToken(isUser._id);
        res.cookie("talkSpace", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "development" ? false : true
        });

        res.status(200).json({
            message:"Login success",
            user: {
                _id: isUser._id,
                fullName:isUser.fullName,
                email: isUser.email,
                profileImage: isUser.profileImage
            }
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}
const logoutController = async (req, res) => {
    res.cookie("talkSpace","",{
        maxAge:0
    });
    res.status(200).json({
        message:"Logout success"
    });
}

const updateProfile =  async (req,res) => {

}

module.exports = {
    signupController,
    loginController,
    logoutController,
    updateProfile,
}