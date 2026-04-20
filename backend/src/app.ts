import express from "express";
import cors from "cors";

import studentRoutes from "./routes/students.routes";
import teacherRoutes from "./routes/teachers.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/students", studentRoutes);
app.use("/teachers", teacherRoutes);

export default app;