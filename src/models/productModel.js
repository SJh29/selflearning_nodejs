const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: Number,
    required: true,
  },
});

const productModel = new mongoose.model("Products", productSchema);

module.exports = productModel;
