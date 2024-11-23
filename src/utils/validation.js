const validator = require("validator");

const validation = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Enter valid the name");
  } else if (!validator.isEmail(email)) {
    throw new Error("Enter valid the email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter valid strong password");
  }
};

module.exports = {
  validation,
};
