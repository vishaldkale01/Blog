const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema({
  title: String,
  desc: String,
  name : String ,
  createdAt: { default: new Date(), type: String },
});
module.exports = mongoose.model("blog", BlogSchema);
