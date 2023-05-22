const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema({
  chat: String,
  name: String,
  pwd: Number,
});

module.exports = mongoose.model("user", User);
