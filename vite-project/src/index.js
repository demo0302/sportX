import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow frontend to connect
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  // Listen for incoming messages
  socket.on("sendMessage", (message) => {
    console.log("Message received:", message);

    // Broadcast message to all users
    io.emit("receiveMessage", message);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
