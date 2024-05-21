// 수업참여 0430 - 이상연 60211684

const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/login");
});

router
  .route("/login")
  .get((req, res) => {
    console.log("login");
    const username = req.session.userid;
    console.log(username);
    res.render("login", { title: "Login", name: username });
  })
  .post((req, res) => {
    const id = req.body.login;
    const pw = req.body.password;
    console.log(req.query);
    console.log(req.body);
    if (id === "staff" && pw === "staff") {
      req.session.userid = id;
      res.render("login", { title: "Login", name: id });
    } else {
      res.render("login", { title: "Login" });
    }
  });

module.exports = router;
