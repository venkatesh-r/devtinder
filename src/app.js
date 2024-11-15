const express = require("express");
const { auth } = require("./middleware/auth");
const connectDB = require("./config/database");

const app = express();

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
