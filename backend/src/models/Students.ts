import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  id: String,
  name: String,
  class: String,
});

export const Student = mongoose.model("Student", StudentSchema);