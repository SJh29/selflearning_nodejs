async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const result = await response.json();
  console.log(result);
  if (!result.error) {
    //document.getElementById("success").style.display = "block";
    document.cookie = `token=${result.token}; path=/`;
    console.log(document.cookie);
    showToast("<p style='text-align:center'>Login Successful</p>");
  } else {
    showToast("<p style='text-align: center'>Login Failed</p>");
  }
}

async function redirectBut() {
  window.location.href = `http://localhost:3000/protected/`;
}

function showToast(msg) {
  let toastbox = document.getElementById("toast-box");
  let toast = document.createElement("div");

  toast.classList.add("toast");
  toast.innerHTML = msg;
  toastbox.appendChild(toast);
  setTimeout(() => {
    toast.remove();
    redirectBut();
  }, 6000);
}
