const jwt = require("jsonwebtoken");
const User = require("../models/User");

// PROTECT ROUTES
const protect = async (req, res, next) => {
  let token;

  if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ FIX: GET FULL USER (IMPORTANT)
    const user = await User.findById(decoded.id).select("-password");

    req.user = user;

    next();
  } catch (err) {
    return res.redirect("/login");
  }
};

// ROLE CHECK
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send("Access denied");
    }
    next();
  };
};

module.exports = { protect, authorize };