import express from "express";
import { Location } from "../models/Locations";
import { Student } from "../models/Students";


const router = express.Router();

router.get("/", async (req, res) => {
  const locations = await Location.find();
  const students = await Student.find();
  

  const result = locations.map((loc) => {
  const student = students.find(
    (s) => String(s.id) === String(loc.studentId)
  );
console.log("LOC:", loc.studentId);
  return {
    id: loc.studentId,
    lat: loc.lat,
    lng: loc.lng,
    time: loc.time,
    name: student?.name || "לא ידוע",
  };
  
console.log("STUDENTS:", students.map(s => s.id));
});
  

  res.json(result);
});

router.post("/", async (req, res) => {
  const { studentId, lat, lng, time } = req.body;

  const location = new Location({
    studentId,
    lat,
    lng,
    time,
  });

  await location.save();

  res.json({ success: true });
});

export default router;