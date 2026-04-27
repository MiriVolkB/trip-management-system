import express from "express";
import { authenticate } from "../middleware/authenticate";
import { addTeacher, getTeachers } from "../controllers/teachers.controller";

const router = express.Router();

router.post("/", authenticate, addTeacher);
router.get("/", authenticate, getTeachers);


export default router;