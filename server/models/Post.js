const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  destinationFrom: String,
  destinationTo: String,
  timeOfRideShare: Date,
  seatsAvailable: Number,
  price: Number,
  expiresAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  winterTires: {
    type: Boolean,
    default: false,
  },
  pets: {
    type: Boolean,
    default: false,
  },
  music: {
    type: Boolean,
    default: false,
  },
  bikes: {
    type: Boolean,
    default: false,
  },
  luggage: {
    type: String,
    enum: ["No luggage", "S", "M", "L"],
    default: "No luggage",
  },
});

module.exports = mongoose.model("Post", PostSchema);
