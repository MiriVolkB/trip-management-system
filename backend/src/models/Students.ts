import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  id: String,
  name: String,
  role: String, // "TEACHER" | "STUDENT"
  class: String,
});

export const Student = mongoose.model("Student", StudentSchema);