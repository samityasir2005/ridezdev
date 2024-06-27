// routes/user.js
const express = require("express");
const router = express.Router();

const {
  login,
  register,
  dashboard,
  getAllUsers,
  verifyEmail,
} = require("../controllers/user");
const {
  createPost,
  getPostDetails,
  getAllPosts,
} = require("../controllers/post");
const authMiddleware = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/dashboard", authMiddleware, dashboard);
router.get("/allusers", getAllUsers);

router.post("/posts", authMiddleware, createPost);
router.get("/posts/:id", authMiddleware, getPostDetails);
router.get("/posts", authMiddleware, getAllPosts);
router.get("/verify-email/:token", verifyEmail);

module.exports = router;
