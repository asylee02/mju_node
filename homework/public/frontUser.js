document.addEventListener("DOMContentLoaded", () => {
  const editButtons = document.querySelectorAll("#edit");
  const deleteButtons = document.querySelectorAll("#delete");
  const popup = document.querySelector("#editPopup");
  const departBg = document.querySelector("#departBg");
  const departTbody = document.querySelector("#departTbody");
  const editPopup = document.querySelector("#editPopupButton");
  let id;
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      id = event.target.getAttribute("data-id");
      console.log(`Delete button clicked for item with id: ${id}`);

      axios
        .delete(`/depart/${id}`)
        .then((response) => {
          console.log("Delete successful", response);
          // 삭제 후 UI 업데이트
          console.log(event.target.parentElement.parentElement);
          departTbody.removeChild(event.target.parentElement.parentElement);
        })
        .catch((error) => {
          console.error("Error deleting item", error);
        });
    });
  });
  let row;
  editButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      console.log("Edit button clicked");
      popup.style.display = "flex";
      id = event.target.getAttribute("data-id");
      row = event.target.parentElement.parentElement;
      const airline = row.children[0].textContent;
      const to = row.children[1].textContent;
      const gate = row.children[2].textContent;

      // 수정 팝업에 기존 데이터 채우기
      document.getElementById("editAirline").value = airline;
      document.getElementById("editTo").value = to;
      document.getElementById("editGate").value = gate;

      // 수정 팝업의 "수정하기" 버튼 클릭 시
    });
  });
  editPopup.addEventListener("click", () => {
    const newAirline = document.getElementById("editAirline").value;
    const newTo = document.getElementById("editTo").value;
    const newGate = document.getElementById("editGate").value;

    axios
      .put(`/depart/${id}`, {
        airline: newAirline,
        to: newTo,
        gate: newGate,
      })
      .then((response) => {
        console.log("Edit successful", response);
        // 수정 후 UI 업데이트
        row.children[0].textContent = newAirline;
        row.children[1].textContent = newTo;
        row.children[2].textContent = newGate;
        popup.style.display = "none";
      })
      .catch((error) => {
        console.error("Error editing item", error);
      });
  });
});
