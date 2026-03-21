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

  res.render("auth/register");
});

// SHOW PAGES
router.get("/register", (req, res) => res.render("auth/register"));
router.get("/login", (req, res) => res.render("auth/login"));

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashed,
  });

  res.redirect("/login");
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

  res.render("dashboard/user", { user });
});

// LOGOUT
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

module.exports = router;