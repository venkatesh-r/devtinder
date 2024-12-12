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
      console.log(toUser);
      if (!toUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.send("successful");
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
);

module.exports = requestRouter;
