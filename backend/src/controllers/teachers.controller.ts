import { Teacher } from "../models/Teacher";

// ➕ הוספת מורה
export const addTeacher = async (req: any, res: any) => {
  try {
    const { id, name, teacherClass } = req.body;

    const teacher = new Teacher({
      id,
      name,
      teacherClass,
    });

    await teacher.save();

    res.status(201).json(teacher);
  } catch (err) {
    res.status(500).json({ error: "Failed to add teacher" });
  }
};

// 📋 קבלת כל המורות
export const getTeachers = async (_req: any, res: any) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: "Failed to get teachers" });
  }
};