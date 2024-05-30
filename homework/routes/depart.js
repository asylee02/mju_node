//  고급웹프로그래밍 과제#2 이상연 60211684

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs").promises;
const flights = require("../public/flights.js");
const Flight = require("../models/flight.js");
const Ticket = require("../models/ticket.js");
const { sequelize } = require("../models/");
const router = express.Router();
router.get("/", async (req, res) => {
  const username = req.session.userid;
  const flight = await Flight.findAll({});

  const tickets = await sequelize.query(
    "SELECT * FROM tickets NATURAL JOIN flights"
  );
  res.render("depart", {
    title: "deaprt",
    name: username,
    flights: flight,
    tickets: tickets[0],
  });
});
router.post("/", async (req, res) => {
  console.log(req.body);
  await Flight.create({
    airline: req.body.airline,
    origin: req.body.to,
    destination: req.body.destination,
    departure_time: req.body.departure_time,
    arrival_time: req.body.arrival_time,
  });
  // POST 요청을 처리한 후 리다이렉트
  res.redirect("/depart");
});

router.put("/", async (req, res) => {
  // console.log(req.body);
  await Ticket.update(
    {
      seat_number: req.body.seat,
    },
    {
      where: { ticket_id: req.body.id },
    }
  )
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
  // res.redirect("/depart");
  res.end();
});

module.exports = router;
