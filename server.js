require('dotenv').config();
const express = require("express");
const CookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
// Import routes
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(CookieParser());
 // Use routes
app.use("/api", authRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB is connected"))
  .catch((err) => console.error(err));
 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app is running on the port ${PORT}`);
});
