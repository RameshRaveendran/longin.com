const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");


dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const connectDB = require("./config/db");
const viewRoutes = require("./routes/viewRoutes");



// connect database
connectDB();

app.use("/", viewRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// Test Route
// app.get("/", (req, res) => {
//   res.send("Server is running...");
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});