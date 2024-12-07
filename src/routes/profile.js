const express = require("express");
const { userAuth } = require("../middleware/auth");
const profileRouter = express.Router();
const { validateProfileData } = require("../utils/validation");

//Profile call
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(500).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/update", userAuth, async (req, res) => {
  try {
    if (validateProfileData(req)) {
      throw new Error("Invalid edit request");
    }
    console.log(req.user);
    const loggedInUser = req.user; //coming from userAuth

    Object.keys(req.body).forEach((keys) => {
      return (loggedInUser[keys] = req.body[keys]);
    });

    await loggedInUser.save();
    res.send(`${loggedInUser.firstName} your profile has been updated`);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
