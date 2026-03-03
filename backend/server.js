const express = require('express');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 8000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Routes - ALL routes here
app.get('/', (req, res) => {
  res.json({ message: 'Dating App Backend - Port 8000' });
});

app.get('/api', (req, res) => {
  res.json({ message: 'API working!' });
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);
    const userId = Date.now().toString();
    const token = jwt.sign({ userId }, 'supersecretkey', { expiresIn: '24h' });
    
    res.json({
      success: true,
      message: 'User registered',
      user: { id: userId, name, email },
      token
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const userId = Date.now().toString();
  const token = jwt.sign({ userId }, 'supersecretkey', { expiresIn: '24h' });
  
  res.json({
    success: true,
    message: 'Login successful',
    token
  });
});

// Socket.io later - focus on auth first
app.get('/health', (req, res) => res.json({ status: 'OK' }));

app.listen(PORT, () => {
  console.log('🚀 Backend: http://localhost:8000');
  console.log('📱 Frontend: http://localhost:3000');
});
