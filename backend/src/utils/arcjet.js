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
      max: 100,
      interval: 60,
    }),
  ],
});

module.exports = aj;
