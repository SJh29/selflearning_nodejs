const express = require("express");
const router = express.Router();
const protectedRoute = require("./protected.routes");
const authRoutes = require("./auth.routes");
const crudRoutes = require("./crud.routes");
const scriptRoute = require("./scripts.routes");

//const appAllroutes = () => {
router.get("/", (req, res) => {
  res.redirect("/auth/login");
});
router.use("/scripts", scriptRoute);
router.use("/crud", crudRoutes);
router.use("/auth", authRoutes);
router.use("/protected", protectedRoute);

module.exports = router;
