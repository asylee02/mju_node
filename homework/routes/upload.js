//  고급웹프로그래밍 과제#2 이상연 60211684

const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// storage: 업로드할 파일을 어디에 저장할 지 선택
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 파일이 저장될 디렉토리 설정
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // 파일 이름 설정 (기존 이름 + 현재 시간)
    const ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 파일 크기 제한: 5MB
});

// 업로드 페이지 렌더링
router.get("/", (req, res) => {
  const username = req.session.userid;
  res.render("upload", {
    title: "기내식 사진 업로드",
    name: username,
    airplane: "",
    filenames: "",
  });
});

// 파일 업로드 처리
router.post("/", upload.array("manyImage"), (req, res) => {
  const username = req.session.userid;
  console.log(req.files, req.body);
  res.render("upload", {
    title: "기내식 사진 업로드",
    name: username,
    airplane: req.body.title,
    filenames: req.files,
  });
});

// 오류 처리 미들웨어 추가
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("서버 에러가 발생했습니다!");
});

// 파일 업로드 오류 처리 미들웨어 추가
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer에서 발생한 에러 처리
    res.status(400).send("파일 업로드 중 오류가 발생했습니다: " + err.message);
  } else {
    // 기타 오류 처리
    next(err);
  }
});

module.exports = router;
