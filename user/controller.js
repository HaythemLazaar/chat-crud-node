var express = require("express");
var Service = require("./userService");
var router = express.Router();

router.get("/add/:name/:pwd", Service.add);
router.get("/list", Service.list);
router.get("/addMessage", Service.storeMessage);

/*
let Chat = require("./chatModule");

router.post("/chat/add", (req, res, next) => {
  const { name, message } = req.body;
  console.log("posting");
  console.log(req.body);
  new Chat({
    chat: message,
    name: name,
    date: new Date(),
  }).save((err, data) => {
    if (err) console.log(err);
    else {
      console.log(data);
      res.json(data);
      res.redirect("/chat");
    }
  });
});
*/
module.exports = router;
