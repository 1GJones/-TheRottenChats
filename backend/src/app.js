const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const authRoutes = require('./routes/auth.routes');
const chatRoutes = require('./routes/chat.routes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] }
});

app.use(cors());
app.use(express.json());

// Test route
app.get('/api', (req, res) => res.json({ message: 'API working' }));

// Auth routes
app.use('/api/auth', authRoutes);

// Chat routes  
app.use('/api/chat', chatRoutes);

module.exports = { app, server, io };
