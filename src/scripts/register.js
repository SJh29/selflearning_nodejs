async function register() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const response = await fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  const result = await response.json();
  showToast(result.message);
}
function showToast(msg) {
  let toastbox = document.getElementById("toast-box");
  let toast = document.createElement("div");

  toast.classList.add("toast");
  toast.innerHTML = msg;
  toastbox.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 6000);
}
