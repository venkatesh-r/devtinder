const express = require("express");
const { userAuth } = require("./middleware/auth");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validation } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
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
    });
    await user.save();
    res.send("User scessfully saved");
  } catch (err) {
    res.status(500).send("ERROR: " + err.message);
  }
});

//Login call
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid user");
    }
    const isPasswordValid = await user.bcryptPWD(password);
    console.log(isPasswordValid);
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

//send request connection
app.post("/sendRequest", userAuth, (req, res) => {
  try {
    const { firstName } = req.user;
    res.send(firstName + " has sent the user request");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//Profile call
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(500).send("ERROR: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Connected to Database");
    app.listen(3000, () => {
      console.log("server started in port 3000");
    });
  })
  .catch((err) => {
    console.error("Database not connected");
  });
