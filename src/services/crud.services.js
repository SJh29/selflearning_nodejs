const userData = require("../models/userModel");

const findData = async (data) => {
  try {
    const { _id, username, email } = data;
    var found = {};
    if ((_id, username && email)) {
      found = await userData
        .find({
          _id,
          email,
          username,
        })
        .exec();
    } else if (username) {
      found = await userData
        .find({
          username,
        })
        .exec();
    } else if (email) {
      found = await userData
        .find({
          email,
        })
        .exec();
    } else if (_id) {
      found = await userData
        .findOne({
          _id,
        })
        .lean()
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
    const result = await userData.findOneAndDelete(user).exec();
    return result;
  } catch (err) {
    console.error(err);
    return 500;
  }
};

const updateData = async (data) => {
  try {
    const { username, email, password, newUsername, newPassword } = data;
    var nName = false;
    var nPass = false;
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
