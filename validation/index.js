const userValidation = require("./user");

class Validation {
  signup(req, res, next) {
    const { error } = userValidation.signup.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      return res.status(400).json({ error: message });
    }
  }

  login(req, res, next) {
    const { error } = userValidation.login.validate(req.body);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      return res.status(400).json({ error: message });
    }
  }
}

module.exports = new Validation();
