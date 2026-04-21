import express from "express";
import { addStudent, getStudents, getStudentById, getStudentByClass } from "../controllers/students.controller";

const router = express.Router();

router.post("/", addStudent);
router.get("/", getStudents);

router.get("/class/:studentClass", getStudentByClass);
router.get("/:id", getStudentById);


export default router;

