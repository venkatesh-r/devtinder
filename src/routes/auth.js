const express = require("express");
const { userAuth } = require("../middleware/auth");
const User = require("../models/user");
const { validation } = require("../utils/validation");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, profile, bio, skills, age } =
    req.body;
  try {
    //validating user
    validation(req);
    const passwordHash = await bcrypt.hash(password, 10);
    //Creating new instance of user
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      profile,
      bio,
      skills,
      age,
    });
    await user.save();
    res.send("User scessfully saved");
  } catch (err) {
    res.status(500).send("ERROR: " + err.message);
  }
});

//Login call
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid user");
    }
    const isPasswordValid = await user.bcryptPWD(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token);
      res.send("Login successful");
    } else {
      throw new Error("Invalid user");
    }
  } catch (err) {
    res.status(500).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Log out successfully");
});

module.exports = authRouter;
