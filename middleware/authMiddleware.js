const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 1) PROTECT ROUTES (verify token)
const protect = async (req, res, next) => {
  let token;

  // check cookie
  if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.id };

    next();
  } catch (err) {
    return res.redirect("/login");
  }
};


// protect = async (req, res, next) => {
//   let token;

//   // token from header: Authorization: Bearer <token>
//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     try {
//       token = req.headers.authorization.split(" ")[1];

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // attach user to request (without password)
//       req.user = await User.findById(decoded.id).select("-password");

//       next();
//     } catch (error) {
//       return res.status(401).send("Not authorized, token failed");
//     }
//   }

//   if (!token) {
//     return res.status(401).send("Not authorized, no token");
//   }
// };

// 2) ROLE CHECK (admin/user)
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send("Access denied");
    }
    next();
  };
};



module.exports = { protect, authorize };