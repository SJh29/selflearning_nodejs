const CRUDModelService = require("../services/crudProduct.services");
module.exports = {
  createEntry: async (req, res) => {
    const product = await CRUDModelService.createData(req.body);
    if (product == 500) {
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.status(200).json("Success");
    }
  },
  deleteEntry: async (req, res) => {
    const result = await CRUDModelService.deleteData(req.body);
    if (result == 500) {
      res.status(500).json({ message: "Internal Server Error" });
    } else if (result == null) {
      res.status(400).json({ message: "Document does not exist" });
    } else {
      res.status(200).json("Success");
    }
  },
  updateEntry: async (req, res) => {
    const updated = await CRUDModelService.updateData(req.body);
    if (updated == 500) {
      res.status(500).json({ message: "internal server error" });
    } else if (updated == null) {
      res.status(400).json({ message: "Document not found" });
    } else {
      res.status(200).json("Success");
    }
  },
  findEntry: async (req, res) => {
    const found = await CRUDModelService.findData(req.body);
    if (found == 500) res.status(500).end();
    else if (found == null) res.status(400).end();
    else res.status(200).json("Success");
  },
  findAll: async (req, res) => {
    const found = await CRUDModelService.findAllData();
    res.status(200).json(found);
  },
};
