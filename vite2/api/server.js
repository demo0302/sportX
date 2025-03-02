import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { createServer } from "http";

// routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

import { connectDB } from "./config/db.js";
import { initializeSocket } from "./socket/socket.server.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

initializeSocket(httpServer);

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	})
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/client/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
	});
}

httpServer.listen(PORT, () => {
	console.log("Server started at this port:" + PORT);
	connectDB();
});

import axios from "axios";

// Add this route before the production static file serving
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