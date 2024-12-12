const express = require("express");
const { userAuth } = require("../middleware/auth");
const requestRouter = express.Router();
const connectionRequest = require("../models/connectionRequest");

//send request connection
requestRouter.post("/sendRequest/:status/:userId", userAuth, (req, res) => {
  try {
    const fromUserId = req.params.userId;
    const status = req.params.status;
    const userId = req.user._id;
    console.log(fromUserId, status, userId);
    res.send("successful");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = requestRouter;
