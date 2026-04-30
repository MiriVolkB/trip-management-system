import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  studentId: { type: String, unique: true }, 
  lat: Number,
  lng: Number,
  time: String,
});

export const Location = mongoose.model("Location", LocationSchema);