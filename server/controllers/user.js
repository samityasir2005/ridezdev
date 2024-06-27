//controllers/user.js

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendVerificationEmail } = require("../services/emailService");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { sendResetPasswordEmail } = require("../services/emailService");
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Bad request. Please add email and password in the request body",
    });
  }

  let foundUser = await User.findOne({ email: req.body.email });

  if (foundUser) {
    if (!foundUser.verified) {
      return res
        .status(400)
        .json({ msg: "Please verify your email before logging in" });
    }

    const isMatch = await foundUser.comparePassword(password);

    if (isMatch) {
      const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      return res.status(200).json({ msg: "user logged in", token });
    } else {
      return res.status(400).json({ msg: "Bad password" });
    }
  } else {
    return res.status(400).json({ msg: "Username not found" });
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
  let foundUser = await User.findOne({ email: req.body.email });

  if (foundUser === null) {
    let { username, email, password } = req.body;

    if (username.length && email.length && password.length) {
      const person = new User({
        name: username,
        email: email,
        password: password,
      });

      person.generateVerificationToken();
      await person.save();

      try {
        await sendVerificationEmail(person.email, person.verificationToken);
        return res.status(201).json({
          msg: "User registered. Please check your email for verification.",
        });
      } catch (error) {
        return res
          .status(500)
          .json({ msg: "Error sending verification email. Please try again." });
      }
    } else {
      return res
        .status(400)
        .json({ msg: "Please add all values in the request body" });
    }
  } else {
    return res.status(400).json({ msg: "Email already in use" });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({
    verificationToken: token,
    verificationTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res
      .status(400)
      .json({ msg: "Invalid or expired verification token" });
  }

  user.verified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined;
  await user.save();

  return res.status(200).json({ msg: "Email verified successfully" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ msg: "Please provide an email address" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  try {
    await sendResetPasswordEmail(user.email, resetToken);
    return res.status(200).json({ msg: "Reset password email sent" });
  } catch (error) {
    return res.status(500).json({ msg: "Error sending reset password email" });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ msg: "Invalid or expired reset token" });
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return res.status(200).json({ msg: "Password reset successfully" });
};

module.exports = {
  login,
  register,
  dashboard,
  getAllUsers,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
