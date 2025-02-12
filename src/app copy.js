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
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign({ _id: user._id }, "admin@123");
      console.log(user._id, token);
      res.cookie("token", token);
      res.send("Login successful");
    } else {
      throw new Error("Invalid user");
    }
  } catch (err) {
    res.status(500).send("ERROR: " + err.message);
  }
});

//Get user call
app.get("/user", async (req, res) => {
  try {
    const userDetail = await User.find({ email: req.body.email });
    res.send(userDetail);
  } catch (err) {
    res.status(500).send("ERROR: " + err.message);
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

//delete user call
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  console.log(userId);
  try {
    await user.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (err) {
    res.status(404).send("something went wrong");
  }
});

//Update user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const allowed_updates = ["gender", "photoUrl", "skills", "profile"];

    const updateData = Object.keys(data).every((k) => {
      return allowed_updates.includes(k);
    });

    if (!updateData) {
      throw new Error("Update not allowed");
    }

    if (!data.skills.length > 10) {
      throw new Error("Skills should not be more 10");
    }

    await user.findOneAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("User updated successfully");
  } catch (err) {
    res.status(404).send("Update failed:" + err.message);
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

/* app.use("/admin", auth);

app.get("/admin/user", (req, res) => {
  res.send("Added admin user");
});

app.get("/admin/delete", (req, res) => {
  res.send("deleted data");
});

app.get(
  "/test/:userId/:name/:password",
  (req, res, next) => {
    console.log(req.params);
    //res.send({ name: "venkatesh" });
    next();
  },
  (req, res, next) => {
    console.log("response - 2");
    next();
  },
  (req, res) => {
    console.log("response - 3");
    res.send("response sended");
  }
);

app.use("/getUserData", (req, res) => {
  throw new Error("error");
});

//To send unwanted errors
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
}); */
