const express = require("express");
const router = express.Router();
const dashboardRoute = require("./dashboard.routes");
const authRoutes = require("./auth.routes");
const crudRoutes = require("./crud.routes");
const path = require("path");
//const appAllroutes = () => {
router.get("/", (req, res) => {
  res.redirect("/login");
});

router.use("/crud", crudRoutes);
router.use("/", authRoutes);
router.use("/dashboard", dashboardRoute);
router.use("/favicon.ico", (req, res) => {
  res.sendFile(path.join(__dirname, "../favicon.ico"));
});
module.exports = router;
