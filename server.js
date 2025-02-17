require('dotenv').config()
const express = require("express");
const CookieParser = require("cookie-parser")
const mongoose = require("mongoose");
const cros = require("cors");

const app = express();

app.use(express.json);
app.use(cros({origin:"http://localhost:3000", credentials: true}))
app.use(CookieParser());

console.log(process.env.MONGO_URI)
//Database Connection
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: false, useUnifiedTopology:true })
.then(()=> console.log("DB is connected"))
.catch((err)=> console.error(err))

const PORT = process.env.port || 5000;
app.listen(PORT,()=>{
console.log(`app is running on the port ${PORT}`)
})
