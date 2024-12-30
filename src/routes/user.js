const express = require("express");
const { userAuth } = require("../middleware/auth");
const connectionRequestModel = require("../models/connectionRequest");
const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await connectionRequestModel
      .find({
        toUserId: loggedInUser,
        status: "interested",
      })
      .populate("fromUserId", ["firstName", "lastName"]);
    res.json({
      message: "User found",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("ERROR::" + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const requestedConnections = await connectionRequestModel
      .find({
        $or: [
          { fromUserId: loggedInUser, status: "accepted" },
          { toUserId: loggedInUser, status: "accepted" },
        ],
      })
      .populate("fromUserId", "firstName lastName bio");
    const data = requestedConnections.map((row) => row.fromUserId);
    res.json({ data: data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;
