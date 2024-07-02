const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth.middleware");
// Protected route
router.get("/", verifyToken, (req, res) => {
  res.status(200).render("protected");
});

module.exports = router;
