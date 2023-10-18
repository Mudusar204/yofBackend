const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
require('dotenv').config();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// Using Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Importing Routes
const post = require("./routes/post");
const user = require("./routes/user");
const messages = require("./routes/messages");
const groupMessage = require("./routes/groupMessage");
const group = require("./routes/group");


// Using Routes
app.use("/api/v1", post);
app.use("/api/v1", user);
app.use("/api/messages", messages);
app.use("/api/groupMessage", groupMessage);
app.use("/api/group", group);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

module.exports = app;

