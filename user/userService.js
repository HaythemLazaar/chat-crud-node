var User = require("./userModule");
let Chat = require("../chatModule");

const add = (req, res, next) => {
  new User({
    name: req.params.name,
    pwd: req.params.pwd,
  }).save((err, data) => {
    if (err) console.log(err);
    else {
      console.log(data);
      res.json(data);
    }
  });
};

const list = (req, res, next) => {
  User.find((err, data) => {
    if (err) console.log(err);
    else {
      console.log(data);
      res.json(data);
    }
  });
};

const storeMessage = (message, name) => {
  new Chat({
    content: message,
    pseudo: name,
    date: new Date(),
  }).save((err, data) => {
    if (err) console.log(err);
    else {
      console.log(data);
      return data;
    }
  });
};

const getMessages = async (req, res, next) => {
  Chat.find((err, data) => {
    if (err) console.log(err);
    else {
      console.log(data);
      return res.json(data);
    }
  });
};

module.exports = { add, list, storeMessage, getMessages };
