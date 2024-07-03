const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  var token = "";
  if (req.cookies.token) {
    token = req.cookies.token;
  } else if (req.header("Authorization")) {
    token = req.header("Authorization");
  }
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req._id = decoded._id;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;
