const { slidingWindow, detectBot, shield } = require("@arcjet/node");
const arcjet = require("@arcjet/node").default;

require("dotenv").config();

const aj = arcjet({
  key: process.env.ARCJET_KEY,
//   log: console,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    slidingWindow({
      mode: "LIVE",
      max: 5,    //only 5 requests
      interval: 10,  //second
    }),
  ],
});

module.exports = aj;
