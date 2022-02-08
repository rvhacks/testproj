const jwt = require("jsonwebtoken");
const secretKey = "kjghfhdfsshgndcuy575itykd47";

class GenerateJwt {
  async login(payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        secretKey,
        { expiresIn: payload.expires_in },
        (err, token) => {
          if (err) {
            console.log("generateJwt -> error", err);
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    });
  }
}

module.exports = new GenerateJwt();
