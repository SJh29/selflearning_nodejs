const express = require("express");
const router = express.Router();

const controller = require("../controllers/controller");
const verifyToken = require("../middlewares/auth.middleware");

router.put("/addDoc", verifyToken, controller.createEntry);
router.post("/updDoc", verifyToken, controller.updateEntry);
router.get("/getDoc", verifyToken, controller.findEntry);
router.get("/delDoc", verifyToken, controller.deleteEntry);

module.exports = router;
