const validator = require("validator");

const validation = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Enter valid the name");
  } else if (!validator.isEmail(email)) {
    throw new Error("Enter the valid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter valid strong password");
  }
};

const validateProfileData = (req) => {
  const userfieldtoUpdate = [
    "firstName",
    "lastName",
    "age",
    "skills",
    "gender",
    "bio",
  ];
  const updatedUserField = Object.keys(req.body).every((k) => {
    return userfieldtoUpdate.includes(k);
  });
};

module.exports = {
  validation,
  validateProfileData,
};
