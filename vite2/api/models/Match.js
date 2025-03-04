// models/Match.js
import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  sport: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  gender: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, default: "scheduled" }, // Can be "scheduled" or "published"
});

export default mongoose.model("Match", matchSchema);