// src/modules/auth/auth.controller.js

const { registerDTO, loginDTO } = require("./auth.dto");
const authService = require("./auth.service");

const register = async (req, res) => {
  const { error } = registerDTO.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const result = await authService.register(req.body);

  if (result.error) return res.status(400).json({ message: result.error });

  res.json({ user: result.user, token: result.token });
};

const login = async (req, res) => {
  const { error } = loginDTO.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const result = await authService.login(req.body);

  if (result.error) return res.status(400).json({ message: result.error });

  res.json({ user: result.user, token: result.token });
};

module.exports = {
  register,
  login,
};
