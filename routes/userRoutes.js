const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
} = require("../controllers/userController");

// example protected route
router.get("/profile", protect, (req, res) => {
  res.send(req.user);
});
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;