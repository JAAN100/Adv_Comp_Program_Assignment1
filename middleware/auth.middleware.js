const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Accepts the token from a cookie or from the "Authorization: Bearer <token>" header
  let token = req.cookies?.access_token;

  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access denied. No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      const message =
        err.name === "TokenExpiredError"
          ? "Token has expired"
          : "Invalid token";
      return res.status(403).json({ success: false, message });
    }
    req.user = decoded; // e.g. { id: "...", iat: ..., exp: ... }
    next();
  });
};

module.exports = verifyToken;
