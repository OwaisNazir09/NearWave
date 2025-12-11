// src/modules/auth/auth.service.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./auth.model");

const register = async ({ username, password }) => {
  const exists = await User.findOne({ username });
  if (exists) return { error: "User already exists" };

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password: hashed,
    displayName: username,
  });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  return { user, token };
};

const login = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) return { error: "Invalid credentials" };

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return { error: "Invalid credentials" };

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  return { user, token };
};

module.exports = {
  register,
  login,
};
