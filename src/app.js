const express = require("express");
const { userAuth } = require("./middleware/auth");
const connectDB = require("./config/database");

const { validation } = require("./utils/validation");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");

app.use("/", authRouter);

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
