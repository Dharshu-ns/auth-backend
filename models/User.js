const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email:{type:String, unique: true},
    password:String,
    googleId:String,
    githubId:String
})

module.exports = mongoose.model("user", UserSchema);