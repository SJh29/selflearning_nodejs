const authServices = require("../services/auth.services");
const msg = require("../utils/messages");
const path = require("path");
module.exports = {
  loginUser: async (req, res) => {
    // would have to use token services to set tokens here
    // use validate login as well
    const { username, password } = req.body;
    await authServices.userLogin(username, password, res);
  },
  registerUser: async (req, res) => {
    data = req.body;
    await authServices.userSignup(data, res);
  },
  logoutUser: (req, res) => {},
};
