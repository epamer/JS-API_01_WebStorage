window.onload = () => {

  // initialization
  ws.setOptions({
    form: document.querySelector("form"),
    table: document.querySelector("table")
  });

  ws.refresh();

  // add event linstener to submit button
  document.querySelector("#submit").addEventListener("click", e => {
    e.preventDefault();
    ws.save();
    ws.clearForm();
    ws.refresh();
  });

  // add event linstener to table row
  document.querySelector("table").addEventListener("dblclick", ws.select);

  // add event linstener to delete button
  document.querySelector("#deleteBtn").addEventListener("click", e => {
    ws.remove("tr.row-select");
    ws.refresh();
  });

  // add event linstener to clear button
  document.querySelector("#clearBtn").addEventListener("click", e => {
    ws.remove("tr");
    ws.refresh();
  });
};
