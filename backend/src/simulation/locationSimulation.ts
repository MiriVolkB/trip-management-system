import { Student } from "../models/Students";
import { Location } from "../models/Locations";

export  async function startLocationSimulation() {
    await Location.deleteMany({});

  setInterval(async () => {
    const students = await Student.find();

    for (const student of students) {
      await Location.findOneAndUpdate(
        { studentId: student.id }, // 👈 מזהה תלמיד
        {
          lat: 32.0853 + (Math.random() - 0.5) * 0.02,
          lng: 34.7818 + (Math.random() - 0.5) * 0.02,
          time: new Date().toISOString(),
        },
        { upsert: true } // 👈 אם אין - יוצר
      );

      console.log("📍 updated:", student.id);
    }

  }, 10000); // כל 10 שניות
}