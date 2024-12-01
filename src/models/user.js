const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minLength: 3,
      maxLength: 15,
    },
    lastName: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 15,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter strong password!");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      trim: true,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "diverse"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    profile: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1393750072/de/vektor/flat-white-icon-mann-f%C3%BCr-webdesign-silhouette-flache-illustration-vektorillustration.jpg?s=612x612&w=0&k=20&c=zuxQgntCXxxFodGjiGi4eS8XvPGeUyQGS4rXSKLFhkY=",
    },
    bio: {
      type: String,
      default: "This is about me",
    },
    skills: {
      type: Array,
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "admin@123", {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.bcryptPWD = async function (passwordInputUser) {
  const user = this;
  const isPasswordValid = await bcrypt.compare(
    passwordInputUser,
    user.password
  );

  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);

/* const user = new User({
    firstName: "Venkatesh",
    lastName: "Ramalingam",
    email: "test@gmail.com",
    password: "admin123",
    age: 36,
    gender: "male",
  }); */
