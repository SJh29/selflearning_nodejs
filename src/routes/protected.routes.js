const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth.middleware");
const { getTokenUsername } = require("../middlewares/tokenParse");

// Protected route
router.get("/", verifyToken, async (req, res) => {
  const data = req.cookies.token;
  var userdata = await getTokenUsername(data);
  res.status(200).render("protected", userdata);
});

module.exports = router;
