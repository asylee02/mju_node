// 수업참여 0430 - 이상연 60211684

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs").promises;
const flights = require("../public/flights.js");

const router = express.Router();
const flights_len = flights.length;
router.get("/", (req, res) => {
  const username = req.session.userid;
  console.log(flights);
  res.render("depart", { title: "deaprt", name: username, flights: flights });
});

router.post("/", (req, res) => {
  const username = req.session.userid;
  console.log(req.body);
  flights.push({
    id: flights_len + 1,
    airline: req.body.airline,
    to: req.body.to,
    gate: req.body.gate,
  });
  res.render("depart", { title: "deaprt", name: username, flights: flights });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
});

module.exports = router;
