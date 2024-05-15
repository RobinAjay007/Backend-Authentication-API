const mongoose = require("mongoose");
const {v4}=require('uuid');

const adminSchema = new mongoose.Schema({
    _id:{type:String,default:v4},
  username: String,
  email: { type: String, unique: true, require: true },
  password: String,
  role: { type: String, default: "admin" },
});

module.exports = mongoose.model("admin", adminSchema);