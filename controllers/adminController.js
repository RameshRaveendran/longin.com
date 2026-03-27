// ============================
// 1. Model Import
// ============================
const User = require("../models/User");


// ============================
// 2. Get All Users
// ============================
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ============================
// 3. Update User
// ============================
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,              // user id from URL
      req.body,                   // updated data
      { new: true, runValidators: true } // return updated + validate
    );

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ============================
// 4. Delete User
// ============================
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "User deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ============================
// 5. Export Controller Functions
// ============================
module.exports = { getAllUsers, updateUser, deleteUser };