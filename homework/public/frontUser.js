//  고급웹프로그래밍 과제#2 이상연 60211684
document.addEventListener('DOMContentLoaded', () => {
  const editTicketButton = document.querySelector('.ticket_edit')
  const deleteTicketButton = document.querySelector('.ticket_delete')
  const createTicketButton = document.querySelector('.ticket_create')
  const create_form = document.querySelector('.create_ticket_form')

  const createConfirmButton = document.querySelector('.create_confirm')
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
    console.log('Edit button clicked')
    // 여기에 수정 버튼이 클릭되었을 때 실행할 코드를 추가하세요.
  })

  deleteTicketButton.addEventListener('click', (event) => {
    console.log('Delete button clicked')
    // 여기에 삭제 버튼이 클릭되었을 때 실행할 코드를 추가하세요.
  })

  create_form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(create_form)
    const passenger_name = formData.get('passenger_name')
    const seat_number = formData.get('seat_number')
    const flight_id = formData.get('flight_id')
    axios.post('/depart/ticket', {
      passenger_name,
      seat_number,
      flight_id,
    })
  })

  createCancelButton.addEventListener('click', (event) => {
    event.preventDefault()
    pop_up.style.display = 'none'
  })
})
