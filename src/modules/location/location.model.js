// src/modules/location/location.model.js

const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LocationLog", LocationSchema);
