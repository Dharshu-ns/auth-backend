const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

//Register User
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hashPassword });
    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Logic User
router.post("/login", async (req, res) => {
  const { email, password } = res.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid Credentials Please Check" });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETE, {
        expiresIn: "1h",
      });
      res
        .cookie("token", token, { httpOnly: true })
        .json({ message: "Login Successful", token });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Logout User
router.get("/logout", (req,res)=>{
    res.clearCookie('token').json({message: "Session Expired Please Login Again"})
})

module.exports= router;