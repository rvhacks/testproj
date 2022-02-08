const User = require("../models/User");
const passwordHash = require("../utils/password-hashing");
const GenerateJwt = require("../jwt/generate-token");

class Authentication {
  async signup(req, res) {
    try {
      const { ...userData } = req.body;
      const checkUser = await User.findOne({ email: userData.email });
      if (checkUser) {
        return res.status(409).json({ error: "User is already registered." });
      }
      const hashedPassword = passwordHash.CreateHash(userData.password);
      userData.password = hashedPassword;
      const user = new User(userData);
      user.save((err, user) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            err: "Something went wrong while saving the user data",
          });
        }
        const { password, ...finalRes } = user._doc;
        return res
          .status(200)
          .json({ data: finalRes, message: "User registered successfully." });
      });
    } catch (err) {
      console.log("catch Error>>>>>", err);
      return res.status(500).json({
        error: "Something went wrong. Please try again",
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const checkUser = await User.findOne({ email });
      if (!checkUser) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const checkPassword = passwordHash.ComparePassword(
        password,
        checkUser.password
      );
      if (!checkPassword) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const resultData = {
        username: checkUser.username,
        email: checkUser.email,
      };
      resultData.token = await GenerateJwt.login({
        username: checkUser.username,
        email: checkUser.email,
        expires_in: "10 days",
      });
      if (!resultData.token) {
        return res
          .status(500)
          .json({ error: "Something went wrong. Please try to login again" });
      }
      return res
        .status(200)
        .json({ data: resultData, message: "User successfully logged in." });
    } catch (err) {
      console.log("catch Error>>>>>", err);
      return res.status(500).json({
        error: "Something went wrong. Please try to login again",
      });
    }
  }
}
module.exports = new Authentication();
