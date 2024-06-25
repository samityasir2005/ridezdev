const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { generateEmailVerificationToken } = require("../utils/emailToken");
const { sendVerificationEmail } = require("../utils/sendEmail");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      msg: "Bad request. Please add email and password in the request body",
    });
  }

  try {
    let foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) {
      const isMatch = await foundUser.comparePassword(password);
      if (isMatch) {
        if (!foundUser.verified) {
          return res
            .status(401)
            .json({ msg: "Please verify your email before logging in" });
        }
        const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });
        return res.status(200).json({ msg: "User logged in", token });
      } else {
        return res.status(400).json({ msg: "Bad password" });
      }
    } else {
      return res.status(400).json({ msg: "Username not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

const dashboard = async (req, res) => {
  try {
    const { _id, name, email, avatar } = req.user;
    res.status(200).json({
      user: {
        id: _id,
        name,
        email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  let users = await User.find({});
  return res.status(200).json({ users });
};

const register = async (req, res) => {
  try {
    let foundUser = await User.findOne({ email: req.body.email });
    if (foundUser === null) {
      let { username, email, password } = req.body;
      if (username.length && email.length && password.length) {
        const person = new User({
          name: username,
          email: email,
          password: password,
          verified: false,
        });
        await person.save();

        const verificationToken = generateEmailVerificationToken(person._id);
        await sendVerificationEmail(email, verificationToken);

        return res.status(201).json({
          msg: "Registration successful. Please check your email to verify your account.",
        });
      } else {
        return res
          .status(400)
          .json({ msg: "Please add all values in the request body" });
      }
    } else {
      return res.status(400).json({ msg: "Email already in use" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  login,
  register,
  dashboard,
  getAllUsers,
};
