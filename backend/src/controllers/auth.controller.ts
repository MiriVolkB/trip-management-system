import { Request, Response } from "express";
import { generateToken } from "../utils/jwt";
import { Student } from "../models/Students";
import { Teacher } from "../models/Teacher";

export async function login(req: Request, res: Response) {
  const { id } = req.body;

  // 🔍 קודם תלמיד
  let user = await Student.findOne({ id });

  let role = "STUDENT";

  // 🔍 אם לא נמצא תלמיד → מחפשים מורה
  if (!user) {
    user = await Teacher.findOne({ id });
    role = "TEACHER";
  }

  // ❌ אם לא נמצא בכלל
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // 🔐 יוצרים טוקן לפי המשתמש שנמצא
  const token = generateToken({
    id: user.id,
    name: user.name,
    role,
    class: user.class,
  });

  return res.json({ token });
}