import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Connect to MONGO_URI for profiles
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Connect to MONGO_URI2 for stadium data
    const stadiumDB = mongoose.createConnection(process.env.MONGO_URI2);
    console.log(`Stadium DB Connected: ${stadiumDB.host}`);
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
    process.exit(1); // exit process with failure, 0 for success
  }
};