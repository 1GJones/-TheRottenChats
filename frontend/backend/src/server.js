const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
});

server.listen(PORT, () => {
  console.log(`Backend + Socket.io on http://localhost:${PORT}`);
});
