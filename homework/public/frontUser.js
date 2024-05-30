//  고급웹프로그래밍 과제#2 이상연 60211684 
document.addEventListener("DOMContentLoaded", () => {
  const editTicketButton = document.querySelector(".ticket_edit");
  const deleteTicketButton = document.querySelector(".ticket_delete");

  editTicketButton.addEventListener("click", (event) => {
    const id = prompt("변경할 티켓 번호를 입력해주세요.");
    const seat = prompt("변경할 좌석번호를 입력해주세요.");
    axios.put("/depart", {
      id,
      seat,
    });
    console.log("Edit button clicked");
    // 여기에 수정 버튼이 클릭되었을 때 실행할 코드를 추가하세요.
  });

  deleteTicketButton.addEventListener("click", (event) => {
    console.log("Delete button clicked");
    // 여기에 삭제 버튼이 클릭되었을 때 실행할 코드를 추가하세요.
  });
});
