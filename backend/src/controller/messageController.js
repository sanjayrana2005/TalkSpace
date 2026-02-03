const messageModel = require("../models/messageModel");
const userModel = require("../models/userModel");
const cloud = require("../utils/cloudinary");
const fs = require("fs");

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
        const { id: userToChatId } = req.params;


        const message = await messageModel.find({
            $or: [
                { senderId: myId, reciverId: userToChatId },
                { senderId: userToChatId, reciverId: myId }
            ]
        });

        res.status(200).json({
            message
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

const sendMessage = async (req, res) => {
    try {
        const { text } = req.body || {};
        const image = req.file;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        if (!req.body?.text && !req.file) {
            return res.status(400).json({
                message: "Message cannot be empty"
            });
        }

        let cloudinaryRes;
        if (image) {
            cloudinaryRes = await cloud.uploader.upload(image.path, {
                folder: "TalkSpace/messages",
                resource_type: "image"
            });
            fs.unlinkSync(image.path);
        }


        let messageData = {};
        if (cloudinaryRes) {
            messageData.image = {
                url: cloudinaryRes.url,
                public_id: cloudinaryRes.public_id
            }
        }
        if (text) {
            messageData.text = text;
        }

        const newMessage = await messageModel.create({
            senderId,
            receiverId,
            text: messageData.text,
            image: messageData.image
        });

        //todo:send message in real time if user is online

        res.status(200).json({
            message: "Message sent",
            newMessage
        });

    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

module.exports = {
    getAllContacts,
    getMessageByUserId,
    sendMessage
};