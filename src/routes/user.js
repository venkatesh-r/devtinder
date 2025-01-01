const express = require("express");
const { userAuth } = require("../middleware/auth");
const connectionRequestModel = require("../models/connectionRequest");
const userRouter = express.Router();
const USERSAFE_DATA = "firstName lastName bio skills";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await connectionRequestModel
      .find({
        toUserId: loggedInUser,
        status: "interested",
      })
      .populate("fromUserId", USERSAFE_DATA);
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
      .populate("fromUserId", USERSAFE_DATA)
      .populate("toUserId", USERSAFE_DATA);

    const data = requestedConnections.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({ data: data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;
