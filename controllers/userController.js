const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const {
  hashPassword,
  comparePassword,
} = require("../utils/hashPassword");

// REGISTER
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

// LOGIN
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

module.exports = { registerUser, loginUser };