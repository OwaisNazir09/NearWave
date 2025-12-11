// src/app.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes");
const { connect } = require("./config/db");
const morgan = require("morgan");

dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connect(process.env.MONGO_URL);

app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({ status: "NearWave API Running" });
});

module.exports = app;
