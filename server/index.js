const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserModel = require("./models/User");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

// Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database failed to connect", err));

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("Token is missing");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json("Error with token");
      } else {
        if (decoded.role === "admin") {
          next();
        } else {
          return res.json("not admin");
        }
      }
    });
  }
};

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      UserModel.create({ name, email, password: hash })
        .then((user) => res.json("Success"))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign(
            { email: user.email, role: user.role },
            "jwt-secret-key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token, { httpOnly: true });
          return res.json({ Status: "Success", role: user.role });
        } else {
          return res.json("The password is incorrect.");
        }
      });
    } else {
      return res.json("No account with that email exists.");
    }
  });
});

app.get("/getUser", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("Token is missing");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json("Error with token");
      } else {
        UserModel.findOne({ email: decoded.email })
          .then((user) => {
            if (user) {
              res.json(user);
            } else {
              res.json("User not found");
            }
          })
          .catch((err) => res.json(err));
      }
    });
  }
});

// Logout route
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json("User logged out");
});

app.listen(3001, () => {
  console.log("Server is Running");
});
