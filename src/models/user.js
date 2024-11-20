const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    min: 18,
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
  skills: {
    type: Array,
  },
});

module.exports = mongoose.model("User", userSchema);
