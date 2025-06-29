const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fs = require("fs");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("view engine", "jade");

app.use("/uploads", express.static("uploads"));

app.use("/api", require("./routes"));

if (!fs.existsSync("uploads")) {
   fs.mkdirSync("uploads");
}

app.use(function (req, res, next) {
   next(createError(404));
});

app.use(function (err, req, res, next) {
   res.locals.message = err.message;
   res.locals.error = req.app.get("env") === "development" ? err : {};

   res.status(err.status || 500).json({
      message: err.message,
      error: req.app.get("env") === "development" ? err : {},
   });
});

module.exports = app;
