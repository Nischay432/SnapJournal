const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

mongoose
  .connect("mongodb://127.0.0.1:27017/React_Backend")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const post_route = require("./routes/postRoutes");
app.use("/api", post_route);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = new mongoose.model("User", userSchema);

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      if (password === existingUser.password) {
        res.json({ message: "Login Successfully", existingUser: existingUser });
      } else {
        res.json({ message: "Password didn't match" });
      }
    } else {
      res.json({ message: "User not registered" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res.json({ message: "User already Registered" });
    } else {
      const newUser = new User({
        name,
        email,
        password,
        posts: [],
      });

      await newUser.save();

      res.json({
        message: "Successfully Registered, Please Login",
        existingUser: newUser,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(8000, () => {
  console.log("Server is running at http://localhost:8000");
});
