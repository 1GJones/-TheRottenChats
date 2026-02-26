const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "Backend OK" }));
app.post("/api/support-bot/message", (req, res) => {
  const topic = req.body.topic || "safety";
  const reply = topic === "safety" ? 
    "Safety tips:\n• Meet public\n• Tell friend\n• Block creeps" : 
    "Local ideas:\n• Coffee shops\n• Day parks";
  res.json({ reply });
});

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:3000" } });

io.on("connection", (socket) => {
  console.log("🔌 Connected:", socket.id);
});

server.listen(8000, () => {
  console.log("🚀 Backend: http://localhost:8000");
});
