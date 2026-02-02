const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    reciverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    text:{
        type:String
    },
    image:{
        type:String
    }
},{timestamps:true});

const messageModel = mongoose.model("message",messageSchema);

module.exports = messageModel;