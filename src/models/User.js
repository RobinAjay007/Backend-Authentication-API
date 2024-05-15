

const mongoose = require("mongoose");
const {v4}=require('uuid')
const userSchema = new mongoose.Schema({
  _id:{type:String,default:v4},
  username: String,
  email: { type: String, unique: true, require: true },
  password: String,
  photo: String,
  bio: String,
  phone: String,
  role: { type: String, default: "user" },
  privacy: { type: String, default: "private" },
});

module.exports = mongoose.model("User", userSchema);
