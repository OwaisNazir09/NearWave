const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    displayName: { type: String, default: "" },
    avatar: { type: String, default: "" },
    bio: { type: String, default: "" },

    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], default: [0, 0] },
    },
  },
  { timestamps: true }
);

UserSchema.index({ location: "2dsphere" });

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
