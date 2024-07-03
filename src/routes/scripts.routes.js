const express = require("express");
const router = express.Router();
const path = require("path");
router.get("/register.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../scripts/register.js"));
});
router.get("/login.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../scripts/login.js"));
});
router.get("/protected.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../scripts/protected.js"));
});
module.exports = router;
