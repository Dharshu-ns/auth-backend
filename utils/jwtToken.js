const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRETE, {
    expiresIn: "1h",
  });
};

module.exports = generateToken;
