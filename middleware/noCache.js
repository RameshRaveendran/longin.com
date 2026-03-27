// ============================
// 1. No Cache Middleware Function
// ============================
// Prevent browser from caching protected pages

const noCache = (req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
};


// ============================
// 2. Export Middleware
// ============================
module.exports = noCache;