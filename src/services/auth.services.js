const jwt = require("jsonwebtoken");
const msg = require("../common/messages");
const bcrypt = require("bcrypt");
const userData = require("../models/userModel");

async function userSignup(data, res) {
  try {
    const { username, email, password } = data;
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new userData({
      username,
      email,
      password: hashedPass,
    });
    await newUser.save();
    res.status(201).json({ message: msg.REG_PASS });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: msg.REG_FAIL });
  }
}

async function userLogin(username, password, res) {
  try {
    const user = await userData.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: msg.AUTH_FAIL });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: msg.AUTH_FAIL });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.log(msg.AUTH_FAILED);
    console.error(error);
    return null;
  }
}

module.exports = { userLogin, userSignup };
