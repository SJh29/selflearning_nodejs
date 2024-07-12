const jwt = require("jsonwebtoken");
const msg = require("../common/messages");
const bcrypt = require("bcryptjs");
const userData = require("../models/userModel");

async function userSignup(data, res) {
  try {
    const { username, email, password } = data;
    let hashedPass = "";
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        hashedPass = hash;
      });
    });
    const newUser = new userData({
      username,
      email,
      password: hashedPass,
    });
    await newUser.save();
    res.status(201).json({ message: msg.REG_PASS });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: msg.REG_FAIL, error: error });
    return;
  }
}

async function userLogin(username, password, res) {
  try {
    const user = await userData.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: msg.AUTH_FAIL });
    }
    let hashedPass = "";
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) throw new Error(err);
        hashedPass = hash;
        bcrypt.compare(password, hash, function (err, res) {
          if (!res) {
            if (err) throw new Error(err);
            return res.status(401).json({ error: msg.AUTH_FAIL });
          }
        });
      });
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error });
    console.error(error);
    return null;
  }
}

module.exports = { userLogin, userSignup };
