var http = require("http");
var express = require("express");
var twig = require("twig");
var app = express();
var joueurRoutes = require("./joueur/joueurController");
var mongoose = require("mongoose");
var mongoConfig = require("./config/mongoConfig.json");
var bodyParser = require("body-parser");
var Service = require("./joueur/joueurService");

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
app.use("/user", joueurRoutes);
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

  socket.on("newPartie", (data) => {
    io.emit("newPartie", data);
    Service.addPartie(data);
    console.log(data);
  });
});

server.listen(3000, () => {
  console.log("server started");
});
