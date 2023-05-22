var http = require("http");
var express = require("express");
var twig = require("twig");
var app = express();
var userRoutes = require("./user/controller");
var mongoose = require("mongoose");
var mongoConfig = require("./config/mongoConfig.json");
var bodyParser = require("body-parser");
let Chat = require("./chat/chatModule");
var Service = require("./user/userService");

mongoose
  .connect(mongoConfig.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/users", userRoutes);
app.set("views", "./views");
app.set("view engine", "twig");

app.get("/chat", (req, res) => {
  res.render("chat", { title: "Chat", message: "Hello there!" });
});

app.get("/", (req, res) => {
  res.render("index", { title: "Home", message: "Hello there!" });
});

var server = http.createServer(app);
const io = require("socket.io")(server);

io.on("connection", function (socket) {
  console.log("User Connected..");
  let name;
  io.emit("notification", "A new user has connected");

  socket.on("msg", (data) => {
    io.emit("msg", data);
    console.log(data);
    Service.storeMessage(data, name);
    io.emit("notification", "new message");
  });
  socket.on("name", (data) => {
    io.emit("name", data);
    name = data;
  });
  socket.on("userIsTyping", (data) => {
    io.emit("userIsTyping", data);
    name = data;
  });
});

server.listen(3000, () => {
  console.log("server started");
});
