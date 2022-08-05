require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authController = require("./controllers/authController.js");
const authRouter = require("./routes/authRoutes");
const foodRouter = require("./routes/foodRoutes");

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

// public routes
app.use("/api/v1/auth", authRouter);

// private routes
app.use(authController.protect);
app.use("/api/v1/food", foodRouter);

module.exports = app;
