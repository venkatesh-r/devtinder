const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://venkypsd:admin123@cluster0.0yyid.mongodb.net/"
  );
};

module.exports = connectDB;
