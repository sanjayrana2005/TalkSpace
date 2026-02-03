const express = require("express");
const {getAllContacts,getMessageByUserId, sendMessage, getChatPartners} = require("../controller/messageController");
const protectRoute = require("../middleware/auth");
const upload = require("../utils/multer");
const arcjectProtection = require("../middleware/arcjet-middleware");

const messageRouter = express.Router();
app.use(arcjectProtection,protectRoute)

messageRouter.get("/contacts",getAllContacts);
messageRouter.get("/chats",getChatPartners);
messageRouter.get("/:id",getMessageByUserId);
messageRouter.post("/send/:id",upload.single("image"),sendMessage);


module.exports=messageRouter;