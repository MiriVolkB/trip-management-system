import express from "express";
import { onlyTeachers } from "../middleware/role.middleware";
import { addTeacher, getTeachers } from "../controllers/teachers.controller";

const router = express.Router();

router.post("/",  addTeacher);
router.get("/", onlyTeachers, getTeachers);


export default router;