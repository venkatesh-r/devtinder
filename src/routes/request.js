const express = require("express");
const { userAuth } = require("../middleware/auth");
const requestRouter = express.Router();

//send request connection
requestRouter.post("/sendRequest", userAuth, (req, res) => {
  try {
    const { firstName } = req.user;
    res.send(firstName + " has sent the user request");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = requestRouter;
