const productService = require("../services/crudProduct.services");
module.exports = {
  createEntry: async (req, res) => {
    const product = await productService.createData(req.body);
    if (product == 500) {
      res.status(500).json({ message: "Internal Server Error" });
    } else if (product.error) {
      res.status(400).json({ error: product.error });
    } else {
      res.status(200).json("Success");
    }
  },
  deleteEntry: async (req, res) => {
    const result = await productService.deleteData(req.body);
    if (result == 500) {
      res.status(500).json({ message: "Internal Server Error" });
    } else if (result == null) {
      res.status(400).json({ message: "Document does not exist" });
    } else {
      res.status(200).json("Success");
    }
  },
  updateEntry: async (req, res) => {
    const updated = await productService.updateData(req.body);
    if (updated == 500) {
      res.status(500).json({ message: "internal server error" });
    } else if (updated == null) {
      res.status(400).json({ message: "Document not found" });
    } else {
      res.status(200).json("Success");
    }
  },
  findEntry: async (req, res) => {
    const found = await productService.findData(req.body);
    if (found == 500) res.status(500).end();
    else if (found == null) res.status(400).end();
    else res.status(200).json("Success");
  },
  findAll: async (req, res) => {
    const found = await productService.findAllData();
    res.status(200).json(found);
  },
};
