// ============================
// 1. Express Router Setup
// ============================
const express = require("express");
const router = express.Router();


// ============================
// 2. Controller Imports
// ============================
const { getAllUsers, updateUser, deleteUser } = require("../controllers/adminController");


// ============================
// 3. Middleware Imports
// ============================
const { protect, authorize } = require("../middleware/authMiddleware");


// ============================
// 4. Get All Users (Admin Only)
// ============================
router.get("/users", protect, authorize("admin"), getAllUsers);


// ============================
// 5. Update User (Admin Only)
// ============================
router.put("/users/:id", protect, authorize("admin"), updateUser);


// ============================
// 6. Delete User (Admin Only)
// ============================
router.delete("/users/:id", protect, authorize("admin"), deleteUser);


// ============================
// 7. Export Router
// ============================
module.exports = router;