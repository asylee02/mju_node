// 수업참여 0430 - 이상연 60211684

const express = require("express");
const morgan = require("morgan");
const path = require("path");

const loginRouter = require("./routes/login");
const visitRouter = require("./routes/visit");
const uploadRouter = require("./routes/upload");

const app = express();
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("login", { title: "Login" });
});

app.get("/visit", (req, res) => {
  res.render("visit", { title: "visit" });
});

app.get("/upload", (req, res) => {
  res.render("upLoad", { title: "upLoad" });
});

app.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")}`);
});
