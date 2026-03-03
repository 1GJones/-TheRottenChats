const { registerUser, loginUser, verifyToken } = require("../services/auth.service");

async function register(req, res) {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: "User created", userId: user.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const { token, user } = await loginUser(req.body.email, req.body.password);
    res.json({ token, user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

function me(req, res) {
  try {
    const decoded = verifyToken(req.headers.authorization.split(" ")[1]);
    res.json({ user: decoded });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = { register, login, me };
