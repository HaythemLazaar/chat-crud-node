const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Chat = new Schema({
  chat: String,
  name: String,
  date: Date,
});

module.exports = mongoose.model("chat", Chat);
