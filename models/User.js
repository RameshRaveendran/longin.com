// ============================
// 1. Mongoose Import
// ============================
const mongoose = require("mongoose");


// ============================
// 2. User Schema Definition
// ============================
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);


// ============================
// 3. Export User Model
// ============================
module.exports = mongoose.model("User", userSchema);