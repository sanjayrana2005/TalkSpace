const express = require("express");
const authRouter = require("./src/router/authRoutes");
const messageRouter = require("./src/router/messageRouter");
const connectDB = require("./src/config/Db");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods:["GET","POST","DELETE","PUT"],
    credentials:true
}));
app.use(express.urlencoded({
    extended:true
}));
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);



connectDB()
    .then((res) => {
        console.log("Db Connected " + res.connection.name);
        app.listen(PORT, () => {
            console.log("server started " + PORT)
        });
    })
    .catch((error) => {
        console.log("DB not connected " + error
        )
    })