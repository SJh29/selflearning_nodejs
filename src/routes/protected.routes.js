const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth.middleware");
const { getTokenUsername } = require("../middlewares/tokenParse");

// Protected route
router.get("/", verifyToken, async (req, res) => {
  const data = req.cookies.token;
  const userdata = await getTokenUsername(data);
  const message = {
    username: userdata,
  };
  res.status(200).render("protected", { message });
});

module.exports = router;
