import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import axios from "axios";
import { connectDB } from "./config/db.js";
import mongoose from 'mongoose'; 
// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// Initialize Socket.IO
let io;
const connectedUsers = new Map(); // { userId: socketId }

export const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL, // Allow connections from your frontend
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const userId = socket.handshake.auth.userId;
    if (!userId) return next(new Error("Invalid user ID"));

    socket.userId = userId;
    next();
  });

  io.on("connection", (socket) => {
    console.log(`User connected with socket id: ${socket.id}`);
    connectedUsers.set(socket.userId, socket.id);

    socket.on("disconnect", () => {
      console.log(`User disconnected with socket id: ${socket.id}`);
      connectedUsers.delete(socket.userId);
    });
  });
};

initializeSocket(httpServer);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/messages", messageRoutes);

// Nearby Stadiums Endpoint
app.get("/api/stadiums", async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const radius = 5000; // 5km radius
    const url = `https://overpass-api.de/api/interpreter?data=[out:json];node[leisure=stadium](around:${radius},${lat},${lng});out;`;

    const response = await axios.get(url);
    const stadiums = response.data.elements.map((element) => ({
      id: element.id,
      name: element.tags.name || "Unnamed Stadium",
      lat: element.lat,
      lng: element.lon,
      address: element.tags["addr:full"] || "Address not available",
    }));

    res.json(stadiums);
  } catch (error) {
    console.error("Error fetching stadiums:", error);
    res.status(500).json({ error: "Failed to fetch stadiums" });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}



// Connect to MONGO_URI2 for stadium data
const stadiumDB = mongoose.createConnection(process.env.MONGO_URI2);

// Stadium Schema
const stadiumSchema = new mongoose.Schema({
  stadium_name: String,
  address: String,
  sports_available: [String],
  facilities: [String],
  contact_details: String,
  opening_hours: String,
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number], // [longitude, latitude]
  },
});

// Create a 2dsphere index for geospatial queries
stadiumSchema.index({ location: "2dsphere" });

const Stadium = stadiumDB.model("Stadium", stadiumSchema);

// Nearby Stadiums Endpoint
app.get("/api/stadiums", async (req, res) => {
  try {
    const { search, sportType, maxDistance, latitude, longitude } = req.query;

    const filters = {};

    if (search) {
      filters.stadium_name = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    if (sportType) {
      filters.sports_available = sportType;
    }

    let stadiums;
    if (latitude && longitude && maxDistance) {
      stadiums = await Stadium.find({
        ...filters,
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [parseFloat(longitude), parseFloat(latitude)],
            },
            $maxDistance: parseFloat(maxDistance),
          },
        },
      });
    } else {
      stadiums = await Stadium.find(filters);
    }

    res.json(stadiums);
  } catch (error) {
    console.error("Error fetching stadiums:", error);
    res.status(500).json({ error: "Failed to fetch stadiums" });
  }
});

// Start server
httpServer.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
  connectDB();
});



