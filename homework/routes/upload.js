// routes/upload.js
// 파일 업로드를 처리하는 라우터

const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// storage: 업로드할 파일을 어디에 저장할 지 선택
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.get("/", (req, res) => {
  const username = req.session.userid;
  res.render("upload", {
    title: "upload",
    name: username,
    airplane: "",
    filenames: "",
  });
});

router.post("/", upload.array("manyImage"), (req, res) => {
  const username = req.session.userid;
  console.log(req.files, req.body);
  res.render("upload", {
    title: "upload",
    name: username,
    airplane: req.body.title,
    filenames: req.files,
  });
});
module.exports = router;
