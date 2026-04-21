import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
  id: String,
  name: String,
  class: String,
});

export const Teacher = mongoose.model("Teacher", TeacherSchema);