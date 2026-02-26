const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users = []; // In memory for now (MongoDB later)
const JWT_SECRET = "your-super-secret-key-change-this-in-prod";



async function registerUser({email, username, password}) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {id: Date.now().toString(), email, password: hashedPassword, username};
    users.push(user);
    return user;

}

async function loginUser(email,password){
    const user = users.find(u => u.email === email);
    if (!user || !await bcrypt.compare(password, user.password)) {
        throw new Error("Invalid credentials");
    }
    const token = jwt.sign({id: user.id, email: user.email}, JWT_SECRET, {expiresIn: '1h'});
    return {token, user: {id: user.id, email: user.email, username: user.username}};    
}
 function verifyToken(token) {
      return jwt.verify(token, JWT_SECRET);
 }
 module.exports = {registerUser, loginUser, verifyToken};