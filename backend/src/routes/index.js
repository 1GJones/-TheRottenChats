const express = require('express');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => res.json({ message: 'Server running on port 8000!' }));
app.get('/api', (req, res) => res.json({ message: 'API working!' }));

// Auth routes WITH controllers inline
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);
    
    // Simulate user creation (replace with real DB later)
    const user = { id: Date.now().toString(), name, email, password: hashedPassword };
    
    // Generate JWT
    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });
    
    res.json({ message: 'User created', userId: user.id, token });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Simulate user lookup (replace with real DB)
    const user = { id: '123', email, password: await bcryptjs.hash(password, 10) };
    
    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });
    
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running: http://localhost:${PORT}`);
});
