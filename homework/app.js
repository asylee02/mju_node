// 수업참여 0430 - 이상연 60211684

const express = require("express");
const morgan = require("morgan");
const path = require("path");

const CookieParser = require("cookie-parser");
const session = require("express-session");
const loginRouter = require("./routes/login");
const departRouter = require("./routes/depart");
const uploadRouter = require("./routes/upload");

const app = express();
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "mySign",
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 600000,
    },
    name: "my-session-cookie",
  })
);

app.use("/", loginRouter);
app.use("/depart", departRouter);
app.use("/upload", uploadRouter);

// app.use(req,res,next)=>{

// }

app.use((req, res, next) => {
  res.status(404).send(`${req.method} ${req.path} is NOT FOUND`);
});

// 서버 에러처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err);
  // res.status(500).send(err.message);
  res.status(500).send("Something broke!");
});

app.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")} 대기중`);
});
