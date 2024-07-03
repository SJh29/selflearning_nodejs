function buildTable(data) {
  var table = document.getElementById("myTable");
  for (var i = 0; i < data.length; i++) {
    var row = `<tr>
                    <td>${data[i].username}</td>
                    <td>${data[i].email}</td>
               </tr>`;
    table.innerHTML += row;
  }
}
async function loadData() {
  //
  const response = await fetch("/crud/findAll", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: document.cookie.token,
    },
  });
  const data = await response.json();
  buildTable(data);
}
async function logOut() {
  const token = document.cookie.token;
  const path = document.cookie.path;
  const domain = document.cookie.domain;
  document.cookie = `token=${token};path=${path};domain=${domain};expires=Thu, 01 Jan 1970 00:00:01 GMT`;
  window.location.href = `http://localhost:3000/login/`;
}
