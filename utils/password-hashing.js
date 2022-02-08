const bcrypt = require("bcrypt");
const saltRounds = 10;

class HashingPassword {
  constructor() {}

  CreateHash(password) {
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  ComparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}

module.exports = new HashingPassword();
