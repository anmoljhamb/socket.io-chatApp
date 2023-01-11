const express = require("express");
const app = express();
const path = require("path");

// middlewares.
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
