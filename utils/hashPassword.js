// ============================
// 1. Bcrypt Library Import
// ============================
const bcrypt = require("bcryptjs");


// ============================
// 2. Hash Password Function
// ============================
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};


// ============================
// 3. Compare Password Function
// ============================
const comparePassword = async (enteredPassword, storedPassword) => {
  return await bcrypt.compare(enteredPassword, storedPassword);
};


// ============================
// 4. Export Functions
// ============================
module.exports = { hashPassword, comparePassword };