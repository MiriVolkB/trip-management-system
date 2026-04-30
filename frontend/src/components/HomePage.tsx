import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MapView from "../components/MapView";
import { getStudents, getTeachers } from "../services/api";
import DashboardCards from "../components/DashboardCards";

export default function HomePage() {

  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
const [teachers, setTeachers] = useState([]);

useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  const s = await getStudents();
  const t = await getTeachers();
  setStudents(s || []);
  setTeachers(t || []);
};

  return (
    <div style={styles.container}>

      <h1 style={styles.title}>מערכת ניהול טיול 🚍</h1>
    {/* CARDS */}
  <DashboardCards teachers={teachers} students={students} />
      {/* כפתורים באמצע */}
      <div style={styles.card}>
        <button
          style={styles.button}
          onClick={() => navigate("/add-student")}
        >
          ➕ הוספת תלמיד
        </button>

        <button
          style={styles.button}
          onClick={() => navigate("/add-teacher")}
        >
          + הוספת מורה
        </button>

        <button
          style={{ ...styles.button, background: "#10b981" }}
          onClick={() => navigate("/login")}
        >
          🔐 כניסת מורה
        </button>
      </div>

      {/* מפה מתחת */}
      <div style={styles.mapWrapper}>
        <MapView />
      </div>

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f4f6fb",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    paddingTop: "40px",
  },

  title: {
    marginBottom: "20px",
  },

  card: {
    background: "white",
    padding: "25px",
    borderRadius: "16px",
    width: "320px",
    textAlign: "center" as const,
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "20px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    fontSize: "14px",
    marginBottom: "10px",
    cursor: "pointer",
  },

  mapWrapper: {
    width: "90%",
    maxWidth: "900px",
    height: "500px",
    borderRadius: "16px",
    overflow: "hidden" as const,
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
};