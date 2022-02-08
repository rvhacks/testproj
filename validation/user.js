const Joi = require("joi");

const signup = Joi.object({
  name: Joi.string().min(5).max(30).required(),

  email: Joi.string().email().min(5).max(50).required(),

  password: Joi.string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .message(
      "Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
    )
    .min(8)
    .max(20)
    .required(),
});

const login = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  signup,
  login,
};
