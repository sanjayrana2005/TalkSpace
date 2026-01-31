const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const protectRoute = async (req,res,next) =>{
    try {
        const token = req.cookies.talkSpace;
        if(!token) {
            return res.status(401).json({
                message:"Unauthorizes-No token provided"
            });
        }

        const decode = await jwt.verify(token,process.env.JWT_SECRET);
        if(!decode){
            return res.status(401).json({
                message:"Unauthorized-Invalid token"
            });
        }

        const user = await userModel.findOne({_id:decode.id});
        if(!user){
            return res.status(404).json({
                message:"user not found"
            });
        }

        req.user=user;
        next();

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

module.exports = protectRoute;