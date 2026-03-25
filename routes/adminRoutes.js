const express = require("express");
const router = express.Router();

const { getAllUsers , updateUser, deleteUser } = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/users", protect, authorize("admin"), getAllUsers);
router.put("/users/:id", protect, authorize("admin"), updateUser);
router.delete("/users/:id", protect, authorize("admin"), deleteUser);

module.exports = router;