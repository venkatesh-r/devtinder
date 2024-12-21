const express = require("express");
const { userAuth } = require("../middleware/auth");
const connectionRequestModel = require("../models/connectionRequest");
const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await connectionRequestModel({
      toUserId: loggedInUser,
      status: "interested",
    });
    res.json({
      message: "User found",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("ERROR::" + err.message);
  }
});

module.exports = userRouter;
