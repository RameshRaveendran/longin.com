const express = require("express");
const router = express.Router();

const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");
const  generateToken  = require("../utils/generateToken");
const { hashPassword, comparePassword } = require("../utils/hashPassword");

router.get("/", (req, res) => {
  if (req.cookies.token) {
    return res.redirect("/dashboard");
  }

  res.render("index");
});

// SHOW PAGES
router.get("/register", (req, res) => res.render("auth/register"));
router.get("/login", (req, res) => res.render("auth/login"));

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Manual validation (BEST PRACTICE)
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }
    // CHECK existingUser
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
      
    }
    
    const user = await User.create(req.body);

    res.status(201).json({
      message: "User created successfully",
      user
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await comparePassword(password, user.password))) {
    return res.send("Invalid credentials");
  }

  const token = generateToken(user._id);

  // store token in cookie
  res.cookie("token", token);

  res.redirect("/dashboard");
});

// DASHBOARD
router.get("/dashboard", protect, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  // 🔥 ROLE CHECK
  if (user.role === "admin") {
    const users = await User.find().select("-password");

    return res.render("dashboard/admin", { user, users });
  }

  res.render("dashboard/user", { user });
});
// delete
router.post("/admin/delete/:id", protect, async (req, res) => {
  const user = await User.findById(req.user.id);

  // only admin
  if (user.role !== "admin") {
    return res.send("Not authorized");
  }

  await User.findByIdAndDelete(req.params.id);

  res.redirect("/dashboard");
});

// LOGOUT
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

module.exports = router;