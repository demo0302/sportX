import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

const users = {}; // Store connected users

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // User joins with a username
  socket.on("joinChat", (username) => {
    users[socket.id] = username;
    io.emit("updateUserList", Object.values(users)); // Send user list to everyone
  });

  // Public message with timestamp
  socket.on("sendMessage", ({ sender, message }) => {
    const timestamp = new Date().toLocaleTimeString();
    io.emit("receiveMessage", { sender, message, timestamp });
  });

  // Private messages
  socket.on("privateMessage", ({ sender, receiver, message }) => {
    const timestamp = new Date().toLocaleTimeString();
    const receiverSocket = Object.keys(users).find((id) => users[id] === receiver);

    if (receiverSocket) {
      io.to(receiverSocket).emit("receivePrivateMessage", { sender, message, timestamp });
    }
  });

  // User disconnects
  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("updateUserList", Object.values(users));
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
