// =======================
// IMPORTS & CONFIG
// =======================
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");

// Load environment variables
dotenv.config();

// =======================
// INITIALIZE APP
// =======================
const app = express();

// =======================
// DATABASE CONNECTION
// =======================
const connectDB = require("./config/db");
connectDB();

// =======================
// MIDDLEWARE
// =======================

// Parse JSON data
app.use(express.json());

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// =======================
// VIEW ENGINE SETUP
// =======================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// =======================
// ROUTES IMPORT
// =======================
const viewRoutes = require("./routes/viewRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

// =======================
// ROUTES USAGE
// =======================

// Frontend routes (EJS pages)
app.use("/", viewRoutes);

// User API routes
app.use("/api/users", userRoutes);

// Admin API routes
app.use("/api/admin", adminRoutes);

// =======================
// 404 HANDLER (OPTIONAL BUT GOOD)
// =======================
app.use((req, res) => {
  res.status(404).send("Route not found");
});

// =======================
// SERVER START
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});