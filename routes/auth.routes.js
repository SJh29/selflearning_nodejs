const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth.controller");
router.post("/login", controller.loginUser);
router.post("/register", controller.registerUser);

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});
module.exports = router;
