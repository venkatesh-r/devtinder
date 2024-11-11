const express = require("express");

const app = express();

app.get(
  "/test/:userId/:name/:password",
  (req, res, next) => {
    console.log(req.params);
    //res.send({ name: "venkatesh" });
    next();
  },
  (req, res, next) => {
    console.log("response - 2");
    next();
  },
  (req, res) => {
    console.log("response - 3");
    res.send("response sended");
  }
);

app.listen(3000, () => {
  console.log("server started in port 3000");
});
