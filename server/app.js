require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
const mainRouter = require("./routes/user");
const cron = require("node-cron");
const Post = require("./models/Post");
const pingRouter = require("./controllers/ping");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1", mainRouter);
app.use("/api", pingRouter);
// Cron job to delete expired posts
cron.schedule("0 * * * *", async () => {
  try {
    const result = await Post.deleteMany({ expiresAt: { $lt: new Date() } });
    console.log(`Deleted ${result.deletedCount} expired posts`);
  } catch (error) {
    console.error("Error deleting expired posts:", error);
  }
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
