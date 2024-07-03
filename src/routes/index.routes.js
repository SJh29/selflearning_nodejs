const express = require("express");
const router = express.Router();
const protectedRoute = require("./protected.routes");
const authRoutes = require("./auth.routes");
const crudRoutes = require("./crud.routes");
const scriptRoute = require("./scripts.routes");
const path = require("path");
//const appAllroutes = () => {
router.get("/", (req, res) => {
  res.redirect("/register");
});
router.use("/scripts", scriptRoute);
router.use("/crud", crudRoutes);
router.use("/", authRoutes);
router.use("/protected", protectedRoute);
router.use("/favicon.ico", (req, res) => {
  res.sendFile(path.join(__dirname, "../favicon.ico"));
});
module.exports = router;
