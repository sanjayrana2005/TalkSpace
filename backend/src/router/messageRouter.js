const express = require("express");
const {getAllContacts,getMessageByUserId} = require("../controller/messageController");
const protectRoute = require("../middleware/auth");

const messageRouter = express.Router();

messageRouter.get("/contacts",protectRoute,getAllContacts);
// messageRouter.get("/chats",getChatPartners);
messageRouter.get("/:id",getMessageByUserId);
// messageRouter.post("/send/:id",sendMessage);


module.exports=messageRouter;