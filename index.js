const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
app.use(cors());
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 3000;

// Store connected clients
const connectedClients = new Map();

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle join room event
  socket.on("join", (roomId) => {
    socket.join(roomId);
    connectedClients.set(socket.id, roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);

    // Notify other clients in the room
    socket.to(roomId).emit("user-joined", socket.id);
  });

  // Handle offer
  socket.on("offer", (offer, targetId) => {
    io.to(targetId).emit("offer", offer, socket.id);
  });

  // Handle answer
  socket.on("answer", (answer, targetId) => {
    io.to(targetId).emit("answer", answer, socket.id);
  });

  // Handle ICE candidate
  socket.on("ice-candidate", (candidate, targetId) => {
    io.to(targetId).emit("ice-candidate", candidate, socket.id);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    const roomId = connectedClients.get(socket.id);
    if (roomId) {
      socket.to(roomId).emit("user-left", socket.id);
      connectedClients.delete(socket.id);
    }
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Signaling server running on port ${PORT}`);
});
