const auth = (req, res, next) => {
  const token = "xyz";
  const authToken = token === "xyz";
  if (!authToken) {
    res.status(404).send("unauthorised");
  }
  next();
};

module.exports = {
  auth,
};
