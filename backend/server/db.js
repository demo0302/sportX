require("dotenv").config(); // Ensure .env is loaded
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.DB) {
      throw new Error("MONGO_URI (DB) is undefined. Check your .env file.");
    }

    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to database successfully");
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
