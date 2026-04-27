import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import studentRoutes from "./routes/students.routes";
import teacherRoutes from "./routes/teachers.routes";
import dotenv from "dotenv";
dotenv.config();

console.log("JWT SECRET:", process.env.JWT_SECRET); // 👈 כאן


const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/students", studentRoutes);
app.use("/teachers", teacherRoutes);

export default app;