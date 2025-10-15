import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

let users = [];

io.on("connection", (socket) => {
  socket.on("join", (username) => {
    socket.username = username;
    users.push(username);
    io.emit("userList", users);
    io.emit("message", { user: "System", text: `${username} joined the chat` });
  });

  socket.on("message", (data) => {
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    users = users.filter((u) => u !== socket.username);
    io.emit("userList", users);
    if (socket.username)
      io.emit("message", {
        user: "System",
        text: `${socket.username} left the chat`,
      });
  });
});

const PORT = 3000;
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
