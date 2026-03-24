const express = require("express");
const router = express.Router();

const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");
const generateToken = require("../utils/generateToken");
const { hashPassword, comparePassword } = require("../utils/hashPassword");

// HOME
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
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "User created successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// LOGIN ✅ FIXED
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = generateToken(user._id);

    res.cookie("token", token);

    // ✅ SEND JSON (NOT REDIRECT)
    res.json({
      success: true,
      message: "Login successful"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

// DASHBOARD
router.get("/dashboard", protect, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  if (user.role === "admin") {
    const users = await User.find().select("-password");
    return res.render("dashboard/admin", { user, users });
  }

  res.render("dashboard/user", { user });
});

// DELETE
router.post("/admin/delete/:id", protect, async (req, res) => {
  const user = await User.findById(req.user.id);

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