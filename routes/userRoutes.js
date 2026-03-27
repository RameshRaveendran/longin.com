// ============================
// 1. Express Router Setup
// ============================
const express = require("express");
const router = express.Router();


// ============================
// 2. Middleware Imports
// ============================
const noCache = require("../middleware/noCache");
const { protect } = require("../middleware/authMiddleware");


// ============================
// 3. Controller Imports
// ============================
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/userController");


// ============================
// 4. Protected Route (Inline Handler)
// ============================
router.get("/profile", protect, noCache, (req, res) => {
  res.send(req.user);
});


// ============================
// 5. User Registration Route
// ============================
router.post("/register", registerUser);


// ============================
// 6. User Login Route
// ============================
router.post("/login", loginUser);


// ============================
// 7. Protected Route (Controller Handler)
// ============================
router.get("/profile", protect, getProfile);


// ============================
// 8. Export Router
// ============================
module.exports = router;