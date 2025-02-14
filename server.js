require('dotenv').config()
const express = require("express");
const CookieParser = require("cookie-parser")
const mongoose = require("mongoose");
const cros = require("cors");
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json);
app.use(cros({origin:"http://localhost:3000", credentials: true}))
app.use(cookieParser());

const PORT = process.env.port || 5000;
app.listen(PORT,()=>{
console.log(`app is running on the port ${PORT}`)
})
