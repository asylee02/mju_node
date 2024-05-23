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

router.delete("/:id", (req, res) => {
  const username = req.session.userid;
  const id = req.params.id;
  const index = flights.findIndex((flight) => flight.id === id);
  flights.splice(index, 1);
  res.render("depart", { title: "deaprt", name: username, flights: flights });
});

router.put("/:id", (req, res) => {
  const username = req.session.userid;
  const id = req.params.id;
  const airline = req.body.airline;
  const to = req.body.to;
  const gate = Number(req.body.gate);
  const index = flights.findIndex((flight) => flight.id === id);
  flights[index] = { id, airline, to, gate };
  console.log(flights);
  res.render("depart", { title: "deaprt", name: username, flights: flights });
});

module.exports = router;
