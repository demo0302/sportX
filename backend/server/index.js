require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const app = express();

// Debugging: Check if DB is loaded correctly
console.log("MongoDB URI:", process.env.DB);

if (!process.env.DB) {
  console.error("Error: MONGO_URI (DB) is not defined in .env file");
  process.exit(1);
}

// Connect to the database
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
