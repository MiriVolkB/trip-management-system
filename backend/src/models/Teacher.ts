import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
  id: String,
  name: String,
  role: String, // "TEACHER" | "STUDENT"
  class: String,
});

export const Teacher = mongoose.model("Teacher", TeacherSchema);