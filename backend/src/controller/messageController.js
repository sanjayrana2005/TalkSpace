const userModel = require("../models/userModel");

const getAllContacts = async (req, res) => {
    const loggedInUserId = req.user._id;
    try {
        const filteredUser = await userModel.find({ _id: { $ne: loggedInUserId } });
        res.status(200).json({
            filteredUser
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

const getMessageByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const {id} = req.params;


        const message =await mess
    } catch (error) {
        
    }
}

module.exports = {
    getAllContacts,
    getMessageByUserId
};