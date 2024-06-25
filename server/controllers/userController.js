// server/controllers/userController.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (user.verified) {
      return res.status(200).json({ msg: "Email already verified" });
    }

    user.verified = true;
    await user.save();

    return res.status(200).json({ msg: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ msg: "Invalid or expired token" });
  }
};
module.exports = { verifyEmail };
