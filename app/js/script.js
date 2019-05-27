window.onload = window => {
  ws.setOptions({
    form: document.querySelector("form"),
    table: document.querySelector("table")
  });

  ws.refresh();

  document.querySelector("#submit").addEventListener("click", e => {
    e.preventDefault();

    ws.save();
    ws.clearFields();
    ws.refresh();
  });
};
