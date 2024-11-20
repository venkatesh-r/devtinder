const express = require("express");
const { auth } = require("./middleware/auth");
const connectDB = require("./config/database");
const User = require("./models/user");
const user = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  //Creating new instance of user
  const user = new User(req.body);

  /* const user = new User({
    firstName: "Venkatesh",
    lastName: "Ramalingam",
    email: "test@gmail.com",
    password: "admin123",
    age: 36,
    gender: "male",
  }); */

  try {
    await user.save();
    res.send("User scessfully saved");
  } catch (err) {
    res.status(500).send("User not added to database" + err.message);
  }
});

//Get user call
app.get("/user", async (req, res) => {
  try {
    const userDetail = await User.find({ email: req.body.email });
    res.send(userDetail);
  } catch (err) {
    res.status(404).send("Something went wrong!");
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
app.patch("/user", async (req, res) => {
  const email = req.body.email;
  //const userDetail = req.body;
  console.log(email);
  try {
    await user.findOneAndUpdate({ email }, { age: 44 });
    res.send("User updated successfully");
  } catch (err) {
    res.status(404).send("Something went wrong");
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
