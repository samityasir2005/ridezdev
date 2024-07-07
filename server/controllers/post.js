const createPost = async (req, res) => {
  try {
    const {
      destinationFrom,
      destinationTo,
      timeOfRideShare,
      seatsAvailable,
      price,
      winterTires,
      pets,
      music,
      bikes,
      luggage,
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
      username: req.user.name,
      destinationFrom,
      destinationTo,
      timeOfRideShare,
      seatsAvailable,
      price,
      winterTires,
      pets,
      music,
      bikes,
      luggage,
      expiresAt,
    });

    await post.save();
    res.status(201).json({ msg: "Post created successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};
