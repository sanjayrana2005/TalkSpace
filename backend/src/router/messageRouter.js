const express = require("express");
const {getAllContacts,getMessageByUserId, sendMessage} = require("../controller/messageController");
const protectRoute = require("../middleware/auth");
const upload = require("../utils/multer");

const messageRouter = express.Router();

messageRouter.get("/contacts",protectRoute,getAllContacts);
// messageRouter.get("/chats",getChatPartners);

messageRouter.get("/:id",protectRoute,getMessageByUserId);
messageRouter.post("/send/:id",protectRoute,upload.single("image"),sendMessage);


module.exports=messageRouter;