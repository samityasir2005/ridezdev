const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const {
      destinationFrom,
      destinationTo,
      timeOfRideShare,
      seatsAvailable,
      price,
    } = req.body;
    const expiresAt = new Date(timeOfRideShare);
    expiresAt.setHours(expiresAt.getHours() + 24);

    const post = new Post({
      user: req.user._id,
      username: req.user.name,
      destinationFrom,
      destinationTo,
      timeOfRideShare,
      seatsAvailable,
      price,
      expiresAt,
    });

    await post.save();
    res.status(201).json({ msg: "Post created successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const getPostDetails = async (req, res) => {
  try {
    // In your controller where you fetch the post
    const post = await Post.findById(postId).populate("user", "name");

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(200).json({
      post: {
        ...post.toObject(),
        username: post.username || post.user.name, // Fallback to user.name if username is not set
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name")
      .sort({ createdAt: -1 });
    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  createPost,
  getPostDetails,
  getAllPosts,
};
