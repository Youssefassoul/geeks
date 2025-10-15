const socket = io();
const messages = document.getElementById("messages");
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const usersList = document.getElementById("users");
const usernameModal = document.getElementById("usernameModal");
const usernameInput = document.getElementById("usernameInput");
const joinBtn = document.getElementById("joinBtn");

let username = "";

joinBtn.addEventListener("click", () => {
  const name = usernameInput.value.trim();
  if (!name) return alert("Enter a username");
  username = name;
  socket.emit("join", username);
  usernameModal.classList.add("hidden");
});

socket.on("userList", (users) => {
  usersList.innerHTML = "";
  users.forEach((u) => {
    const li = document.createElement("li");
    li.textContent = u;
    li.classList = "bg-gray-700 rounded-lg px-3 py-2";
    usersList.appendChild(li);
  });
});

socket.on("message", (data) => {
  const div = document.createElement("div");
  div.classList = `p-3 rounded-lg ${data.user === username ? "bg-indigo-600 self-end" : "bg-gray-700"} max-w-xs`;
  div.innerHTML = `<strong>${data.user}:</strong> ${data.text}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (!text) return;
  socket.emit("message", { user: username, text });
  messageInput.value = "";
});
