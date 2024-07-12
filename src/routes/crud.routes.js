const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const productController = require("../controllers/product.controller");
const verifyToken = require("../middlewares/auth.middleware");
// ! Need to create a new middleware for user crud operations
// router.post("/user/addDoc", verifyToken, userController.createEntry);
// router.post("/user/updDoc", verifyToken, userController.updateEntry);
router.post("/user/getDoc", verifyToken, userController.findEntry);
// router.post("/user/delDoc", verifyToken, userController.deleteEntry);
// router.post("/user/findAll", verifyToken, userController.findAll);
// product routes
router.post("/product/addDoc", verifyToken, productController.createEntry);
router.post("/product/updDoc", verifyToken, productController.updateEntry);
router.post("/product/getDoc", verifyToken, productController.findEntry);
router.post("/product/delDoc", verifyToken, productController.deleteEntry);
router.post("/product/findAll", verifyToken, productController.findAll);
module.exports = router;
