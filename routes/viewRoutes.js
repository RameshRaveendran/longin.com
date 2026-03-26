const express = require("express");
const router = express.Router();

const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");
const generateToken = require("../utils/generateToken");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const noCache = require("../middleware/noCache");


// =======================
// HOME
// =======================
router.get("/", (req, res) => {
  if (req.cookies.token) {
    return res.redirect("/dashboard");
  }
  res.render("index");
});


// =======================
// SHOW PAGES
// =======================
router.get("/register", (req, res) => res.render("auth/register"));
router.get("/login", (req, res) => res.render("auth/login"));


// =======================
// REGISTER
// =======================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    // create user
    await User.create({
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


// =======================
// LOGIN
// =======================
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

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // generate token
    const token = generateToken(user._id);

    // store in cookie
    res.cookie("token", token, {
      httpOnly: true
    });

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


// =======================
// DASHBOARD
// =======================
router.get("/dashboard", protect, noCache, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.redirect("/login");
    }

    // admin dashboard
    if (user.role === "admin") {
      const users = await User.find().select("-password");
      return res.render("dashboard/admin", { user, users });
    }

    // normal user dashboard
    res.render("dashboard/user", { user });

  } catch (err) {
    res.redirect("/login");
  }
});


// =======================
// LOGOUT
// =======================
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});


module.exports = router;