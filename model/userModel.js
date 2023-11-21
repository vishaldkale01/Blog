const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  createdAt: { default: Date.now, type: Date },
});
module.exports = mongoose.model("user", userSchema);
