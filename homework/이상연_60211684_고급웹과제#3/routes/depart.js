//  고급웹프로그래밍 과제#2 이상연 60211684

const express = require('express')
const Flight = require('../models/flight.js')
const Ticket = require('../models/ticket.js')
const { sequelize } = require('../models/')
const router = express.Router()
router.get('/', async (req, res) => {
  console.log('헬로 요기야')
  const flight = await Flight.findAll({})

  const tickets = await sequelize.query(
    'SELECT * FROM tickets NATURAL JOIN flights ORDER BY ticket_id ASC'
  )
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  )
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  res.setHeader('Surrogate-Control', 'no-store')
  res.render('depart', {
    title: 'deaprt',
    flights: flight,
    tickets: tickets[0],
  })
})

router.post('/', async (req, res) => {
  console.log(req.body)
  await Flight.create({
    airline: req.body.airline,
    origin: req.body.to,
    destination: req.body.destination,
    departure_time: req.body.departure_time,
    arrival_time: req.body.arrival_time,
  })
  // POST 요청을 처리한 후 리다이렉트
  res.redirect('/depart')
})

router.put('/', async (req, res) => {
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
    .catch((err) => console.error(err))
  // res.redirect("/depart");
  res.end()
})

router.post('/ticket', async (req, res) => {
  await Ticket.create({
    flight_id: req.body.flight_id,
    passenger_name: req.body.passenger_name,
    seat_number: req.body.seat_number,
  })
  res.redirect('/depart')
})

router.delete(`/ticket/:id`, async (req, res) => {
  const id = req.params.id

  await Ticket.destroy({
    where: { ticket_id: id },
  })
})

module.exports = router
