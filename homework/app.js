//  고급웹프로그래밍 과제#2 이상연 60211684 
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const loginRouter = require("./routes/login");
const departRouter = require("./routes/depart");
const uploadRouter = require("./routes/upload");

const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fs = require("fs");

dotenv.config(); // .env 파일의 환경 변수 설정
const { PORT, COOKIE_SECRET } = process.env;
const app = express();

app.set("port", PORT || 3000); // 포트 설정
app.set("views", path.join(__dirname, "views")); // 뷰 폴더 설정
app.set("view engine", "ejs"); // 뷰 엔진 설정

// 업로드 디렉토리가 없으면 생성
try {
  fs.readdirSync("./uploads");
} catch (error) {
  console.log("upload 파일이 없어서 파일 생성");
  fs.mkdirSync("uploads");
}

// 미들웨어 설정
app.use(morgan("dev")); // 요청 로깅 미들웨어
app.use(express.static(path.join(__dirname, "public"))); // 정적 파일 제공
app.use(express.json()); // JSON 요청 파싱
app.use(express.urlencoded({ extended: false })); // URL-encoded 요청 파싱
app.use(cookieParser(COOKIE_SECRET));

// 세션 설정
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 60000 * 30, // 세션 쿠키 유효 기간 (30분)
    },
    name: "my-session-cookie",
  })
);

// 라우터 설정
app.use("/", loginRouter);
app.use("/depart", departRouter);
app.use("/upload", uploadRouter);

// 404 에러 처리 미들웨어
app.use((req, res, next) => {
  res.status(404).send(`${req.method} ${req.path} is NOT FOUND`);
});

// 서버 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something broke!");
});

// 서버 시작
app.listen(app.get("port"), () => {
  console.log(`http://localhost:${app.get("port")} 대기중`);
});
