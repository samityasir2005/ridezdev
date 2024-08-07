const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const {
      destinationFrom,
      destinationTo,
      timeOfRideShare,
      seatsAvailable,
      price,
      luggage,
      winterTires, // Add this line
      pets, // Add this line
      music, // Add this line
      bikes, // Add this line
      backRowSeating,
      otherOptions,
    } = req.body;

    // Check if the user has created a post in the last hour
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);
    const recentPost = await Post.findOne({
      user: req.user._id,
      createdAt: { $gte: oneHourAgo },
    });

    if (recentPost) {
      return res
        .status(429)
        .json({ msg: "You can only create one post per hour." });
    }

    const expiresAt = new Date(timeOfRideShare);
    expiresAt.setHours(expiresAt.getHours() + 24);

    const post = new Post({
      user: req.user._id,
      destinationFrom,
      destinationTo,
      timeOfRideShare,
      seatsAvailable,
      price,
      luggage,
      winterTires,
      pets,
      music,
      bikes,
      backRowSeating,
      otherOptions,
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
    const post = await Post.findById(req.params.postId).populate(
      "user",
      "name"
    );

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(200).json({
      post: {
        ...post.toObject(),
        username: post.username || post.user.name,
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

const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    await Post.findByIdAndDelete(postId);
    res.status(200).json({ msg: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  createPost,
  getPostDetails,
  getAllPosts,
  getUserPosts,
  deletePost,
};
