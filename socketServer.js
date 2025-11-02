// socketServer.js (ESM)
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("message", (msg) => {
    console.log("Received:", msg);
    io.emit("message", msg);
  });

  socket.on("disconnect", () => console.log("Client disconnected"));
});

const PORT = 4000;
server.listen(PORT, () =>
  console.log(`Socket.IO server running on http://localhost:${PORT}`)
);
