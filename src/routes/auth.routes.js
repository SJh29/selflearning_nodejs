const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth.controller");
router.post("/login", controller.loginUser);
router.post("/register", controller.registerUser);

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  const data = {
    message: "Login",
  };
  res.render("login", data);
});
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  const data = {
    message: "Logout Successful",
  };
  res.render("login", { data });
}); //controller.logoutUser);
module.exports = router;
