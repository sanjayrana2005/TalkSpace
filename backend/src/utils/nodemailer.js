const nodemailer = require("nodemailer");
const createWelcomeEmailTemplate = require("./mailTemplate");
require("dotenv").config;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
    },
});



// Send an email using async/await
const sendMail = async (userEamail, userName, subject) => {

    try {
        const info = await transporter.sendMail({
            from: `"TalkSpace" <${process.env.EMAIL_FROM}>`,
            to: userEamail,
            subject, // Plain-text version of the message
            html: createWelcomeEmailTemplate(userName, process.env.FRONTEND_URL), // HTML version of the message
        });
    } catch (error) {
        if (err.code === 'EENVELOPE') {
            console.log('Rejected recipients:', err.rejected);
            console.log('Rejection details:', err.rejectedErrors);
        }
    }
};

module.exports = { sendMail }