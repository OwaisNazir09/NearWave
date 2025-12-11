
const Joi = require("joi");

exports.registerDTO = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
});

exports.loginDTO = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
