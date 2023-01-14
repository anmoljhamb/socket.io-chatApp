const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

// middlewares.
app.use(
    cors({
        origin: "*",
    })
);
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
