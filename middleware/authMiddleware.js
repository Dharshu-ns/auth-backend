const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateUser = async (req, res, next) => {
  console.log("req", req);
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.decode(token);
    const user = User.findById(decoded.id);
    if (!user) return res.status(400).json({ message: "User not found" });
    jwt.verify(token, user.jwtSecret, (err, verified) => {
      if (err) return res.status(400).json({ message: "invalid Token" });
      req.user = verified;
      next();
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid Token Structure" });
  }
};

module.exports = authenticateUser;
