const express = require("express");
const { userAuth } = require("../middleware/auth");
const requestRouter = express.Router();
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

//send request connection
requestRouter.post(
  "/sendRequest/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const status = req.params.status;
      const toUserId = req.params.userId;

      const allowedStatus = ["ignored", "interested"];

      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid status");
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const existingConnectionRequest = await connectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(404)
          .send({ message: "Connection request is already sent" });
      }

      const connectionrequest = new connectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionrequest.save();
      res.json({ message: "Connection request sent successfully", data });
    } catch (err) {
      res.status(404).send("ERROR : " + err.message);
    }
  }
);

requestRouter.post(
  "/request/reviews/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        res.status(404).send("Invalid status");
      }

      console.log(loggedInUser._id, status, requestId);

      //myself => anotherperson, loggedInId = toUserId,, status = interested, request Id should have valid ID

      const connectionrequest = await connectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionrequest) {
        res.status(404).json({ message: "Connection request not found" });
      }

      console.log("test::" + connectionrequest);

      connectionrequest.status = status;

      const data = await connectionrequest.save();

      res.send("Connection request accepted");
    } catch (err) {
      res.status(404).send("ERROR: " + err.message);
    }
  }
);

module.exports = requestRouter;
