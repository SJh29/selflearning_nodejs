const userData = require("../models/userModel");

const findData = async (data) => {
  try {
    const { username, email, password } = data;
    var found = {};
    if (username && email) {
      found = await userData
        .findOne({
          email: email,
          username: username,
        })
        .exec();
    } else if (username) {
      found = await userData
        .findOne({
          username: username,
        })
        .exec();
    } else if (email) {
      found = await userData
        .findOne({
          email: email,
        })
        .exec();
    } else found = null;
    return found;
  } catch (err) {
    console.error(err);
    return 500;
  }
};

const createData = async (data) => {
  try {
    const { username, email, password } = data;
    const user = new userData({
      username,
      email,
      password,
    });
    await user.save();
    return user;
  } catch (err) {
    console.log(err);
    return 500;
  }
};

const deleteData = async (data) => {
  try {
    const { username, email, password } = data;
    const user = { username, email, password };
    const result = await findOneAndDelete(user).exec();
    return result;
  } catch (err) {
    console.error(err);
    return 500;
  }
};

const updateData = async (data) => {
  try {
    const { username, email, password, newUsername, newPassword } = data;
    var nName = (nPass = false);
    if (newUsername) nName = true;
    if (newUsername) nPass = true;
    const filter = {
      username,
      email,
      password,
    };
    // constructor for newdata
    var newData = {};
    if (nName && nPass) {
      newData = {
        username: newUsername,
        password: newPassword,
      };
    } else if (nName) {
      newData = {
        username: newUsername,
      };
    } else if (nPass) {
      newData = {
        password: newPassword,
      };
    }
    const updated = await userData.findOneAndUpdate(filter, newData, {
      new: true,
    });
    return updated;
  } catch (err) {
    console.error(err);
    return 500;
  }
};

module.exports = {
  findData,
  createData,
  deleteData,
  updateData,
};
