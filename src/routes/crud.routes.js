const express = require("express");
const router = express.Router();

const controller = require("../controllers/controller");
const verifyToken = require("../middlewares/auth.middleware");

router.post("/addDoc", verifyToken, controller.createEntry);
router.post("/updDoc", verifyToken, controller.updateEntry);
router.post("/getDoc", verifyToken, controller.findEntry);
router.post("/delDoc", verifyToken, controller.deleteEntry);
router.post("/findAll", verifyToken, controller.findAll);
module.exports = router;
