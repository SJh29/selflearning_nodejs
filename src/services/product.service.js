const productModel = require("../models/productModel");
const dbService = require("./db.service");
const productService = new dbService(productModel);

async function createData(data) {
  try {
    productService.create(data);
  } catch (error) {
    console.log(`${error}`);
  }
}

module.exports = { createData };
