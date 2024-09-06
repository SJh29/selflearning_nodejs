const CRUDUserService = require("../services/crudUser.services");
const dbService = require("../services/db.service");
const userData = require("../models/userModel");
const userDB = new dbService(userData);

module.exports = {
  createUser: async (req, res) => {
    const { username, email, password } = req.body;
    if (!(username && email && password)) {
      throw new Error("Error creating a new user.");
    }
    await userDB.create({ username, email, password });
    // will work on error handling later
    res.status(200).json("Success");
  },
  deleteUser: async (req, res) => {
    const { username, email, password } = req.body;
    if (!(username && email && password)) {
      throw new Error("Error removing a new user.");
    }
    const result = await userDB.deleteOne({ username, email, password });
    if (result.deletedCount === 1) {
      res.status(200).json("Success");
    } else {
      res.status(400).json("User does not exist.");
    }
  },
  updateUser: async (req, res) => {
    const { username, email, password, newUsername, newPassword } = data;
    let newData = {};
    if (newUsername && newPassword) {
      newData = { username: newUsername, password: newPassword };
    } else if (newUsername) {
      newData = { username: newUsername };
    } else if (newPassword) {
      newData = { password: newPassword };
    }

    const updated = await userDB.update({ username, email, password }, newData);
    res.status(200).json("Success");
  },
  /*   findUser: async (req, res) => {
    const found = await CRUDUserService.findData(req.body);
    if (found == 500) res.status(500).end();
    else if (found == null) res.status(400).end();
    else res.status(200).json("Success");
  },
  findAll: async (req, res) => {
    const found = await CRUDUserService.findAllData();
    res.status(200).json(found);
  }, */
};
