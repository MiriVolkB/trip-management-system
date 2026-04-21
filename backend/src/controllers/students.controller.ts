import { Student } from "../models/Students";

// ➕ הוספת תלמיד
export const addStudent = async (req: any, res: any) => {
  try {
    const { id, name, class: studentClass } = req.body;

    const student = new Student({
      id,
      name,
      studentClass,
    });

    await student.save();

    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: "Failed to add student" });
  }
};

// 📋 קבלת כל התלמידים
export const getStudents = async (_req: any, res: any) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Failed to get students" });
  }
};

// 👤 קבלת תלמיד לפי ID
export const getStudentById = async (req: any, res:any) => {
    try {
        const { id } = req.params;
        const student = await Student.findOne({ id });

        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.json(student);
    
    }catch (err) {
        res.status(500).json({ error: "Failed to get student" });
    }
}

// 👤 קבלת תלמידים לפי כיתה ID
export const getStudentByClass = async (req: any, res: any) => {
    try{
        const { studentClass } = req.params;
        const students = await Student.find({ studentClass });

        if(students.length === 0) {
            return res.status(404).json({ error: "No students found for this class" });
        }

        res.json(students);

    }catch (err) {
        res.status(500).json({ error: "Failed to get students by class" });
    }
}
