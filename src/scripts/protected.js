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
  var token = "";
  if (window.localStorage.getItem("token")) {
    token = window.localStorage.getItem("token");
  } else if (document.cookie.token) {
    token = document.cookie.token;
  }
  console.log(token);
  const response = await fetch("/crud/findAll", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
  const data = await response.json();
  buildTable(data);
}
async function logOut() {
  const response = await fetch("/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    window.location.href = "/";
  }
}
