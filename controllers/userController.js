// ============================
// 1. Imports (Model + Utils)
// ============================
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const {
  hashPassword,
  comparePassword,
} = require("../utils/hashPassword");


// ============================
// 2. Register User
// ============================
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // check user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).send("User already exists");
  }

  // hash password
  const hashedPassword = await hashPassword(password);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.send({
    message: "User registered",
    // token: generateToken(user._id, user.role),
  });
};


// ============================
// 3. Login User
// ============================
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send("Invalid credentials");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    return res.status(400).send("Invalid credentials");
  }

  res.send({
    message: "Login successful",
    token: generateToken(user._id, user.role),
  });
};


// ============================
// 4. Get User Profile
// ============================
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ============================
// 5. Export Controller Functions
// ============================
module.exports = { registerUser, loginUser, getProfile };