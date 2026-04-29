import express from "express";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { addTeacher, getTeachers } from "../controllers/teachers.controller";

const router = express.Router();

router.post("/", (req, res, next) => {
  console.log("POST /teachers HIT");
  next();
}, addTeacher);
router.get(
  "/",
  authenticate,
  authorize(["TEACHER"]),
  getTeachers
);

export default router;