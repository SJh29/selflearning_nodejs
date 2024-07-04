const authServices = require("../services/auth.services");
module.exports = {
  loginUser: async (req, res) => {
    // would have to use token services to set tokens here
    // use validate login as well
    const { username, password } = req.body;
    await authServices.userLogin(username, password, res);
  },
  registerUser: async (req, res) => {
    const data = req.body;
    await authServices.userSignup(data, res);
  },
  logoutUser: (req, res) => {
    res.clearCookie("token");
    res.render("login", { message: "Logout Successful" });
  },
};
