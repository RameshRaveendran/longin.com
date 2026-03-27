// ============================
// 1. JWT Library Import
// ============================
const jwt = require("jsonwebtoken");


// ============================
// 2. Generate Token Function
// ============================
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },                 // Payload (data inside token)
    process.env.JWT_SECRET,       // Secret key
    { expiresIn: "1d" }           // Token expiry time
  );
};


// ============================
// 3. Export Function
// ============================
module.exports = generateToken;