const express = require("express");
const { userAuth } = require("../middleware/auth");
const profileRouter = express.Router();

//Profile call
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(500).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
