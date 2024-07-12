const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  var token = "";
  if (req.query.token) {
    token = req.query.token;
  } else if (req.cookies.token) {
    token = req.cookies.token;
  } else if (req.header("Authorization")) {
    token = req.header("Authorization");
  }
  if (!token) {
    const data = {
      message: "Access Denied",
    };
    return res.status(401).render("unauthorized", { data });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req._id = decoded._id;
    next();
  } catch (error) {
    const data = {
      message: "Invalid Credentials",
    };
    res.status(401).render("unauthorized", { data });
  }
}

module.exports = verifyToken;
