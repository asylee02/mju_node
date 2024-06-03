//  고급웹프로그래밍 과제#3 이상연 60211684
document.addEventListener('DOMContentLoaded', () => {
  const editTicketButton = document.querySelector('.ticket_edit')
  const deleteTicketButton = document.querySelector('.ticket_delete')
  const createTicketButton = document.querySelector('.ticket_create')
  const create_form = document.querySelector('.create_ticket_form')
  const flight_form = document.querySelector('#flight_form')

  const createCancelButton = document.querySelector('.create_cancel')
  const pop_up = document.querySelector('.pop-up')

  createTicketButton.addEventListener('click', () => {
    pop_up.style.display = 'block'
  })

  editTicketButton.addEventListener('click', (event) => {
    const id = prompt('변경할 티켓 번호를 입력해주세요.')
    const seat = prompt('변경할 좌석번호를 입력해주세요.')
    axios.put('/depart', {
      id,
      seat,
    })
  })

  deleteTicketButton.addEventListener('click', () => {
    const id = prompt('삭제할 티켓 번호를 입력해주세요')
    axios.delete(`/depart/ticket/${id}`).then(() => {})
  })

  flight_form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(flight_form)
    const airline = formData.get('airline')
    const to = formData.get('to')
    const destination = formData.get('destination')
    const departure_time = formData.get('departure_time')
    const arrival_time = formData.get('arrival_time')
    if (airline && to && destination && departure_time && arrival_time) {
      axios.post('/depart', {
        airline,
        to,
        destination,
        departure_time,
        arrival_time,
      })
    } else {
      alert('모든 정보를 입력해주세요.')
    }
  })

  create_form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(create_form)
    const passenger_name = formData.get('passenger_name')
    const seat_number = formData.get('seat_number')
    const flight_id = formData.get('flight_id')
    axios
      .post('/depart/ticket', {
        passenger_name,
        seat_number,
        flight_id,
      })
      .then(() => {
        console.log('hello')
        pop_up.style.display = 'none'
        axios.get('/depart')
      })
  })

  createCancelButton.addEventListener('click', (event) => {
    event.preventDefault()
    pop_up.style.display = 'none'
  })
})
