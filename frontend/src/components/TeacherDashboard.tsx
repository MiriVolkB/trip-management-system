import { useEffect, useState } from "react";
import { getStudents, getTeachers } from "../services/api";
import { commonStyles as common } from "../components/ui/commonStyles";

export default function TeacherDashboard() {
  const [students, setStudents] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [view, setView] = useState("");
  const [searchId, setSearchId] = useState("");
  const [classFilter, setClassFilter] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  console.log("USER:", user);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const s = await getStudents();
    const t = await getTeachers();
    console.log("TEACHERS:", t);

    setStudents(s || []);
    setTeachers(t || []);
  };

  const filteredStudent = students.find((s) => s.id === searchId);

  const studentsByClass = students.filter(
    (s) => s.class === classFilter
  );

  return (
    <div style={styles.container}>
  
  {/* HEADER */}
  <div style={styles.header}>
    <h1>מערכת ניהול טיול</h1>
    <p>שלום, {user?.name || "מורה"} 👋</p>
  </div>

  {/* CARDS */}
  <div style={styles.cards}>
    <div style={styles.card}>
      <h2>{teachers.length}</h2>
      <p>מורים</p>
    </div>

    <div style={styles.card}>
      <h2>{students.length}</h2>
      <p>תלמידים</p>
    </div>

    <div style={styles.card}>
      <h2>0</h2>
      <p>חריגות</p>
    </div>
  </div>

  {/* ACTIONS */}
  <div style={styles.actions}>
    <button style={common.button} onClick={() => setView("students")}>
      📚 תלמידים
    </button>

    <button style={common.button} onClick={() => setView("teachers")}>
      👩‍🏫 מורים
    </button>

    <button style={common.button} onClick={() => setView("search")}>
      🎯 חיפוש תלמיד
    </button>

    <button style={common.button} onClick={() => setView("class")}>
      🏫 לפי כיתה
    </button>
  </div>

  {/* CONTENT */}
  <div style={styles.content}>

    {view === "students" &&
      students.map((s) => (
        <div style={styles.row} key={s.id}>
          {s.name} <span>{s.class}</span>
        </div>
      ))}

    {view === "teachers" &&
      teachers.map((t) => (
        <div style={styles.row} key={t.id}>
          {t.name} <span>{t.class}</span>
        </div>
      ))}

    {view === "search" && (
      <>
        <input
          style={common.input}
          placeholder="תעודת זהות"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />

        {filteredStudent && (
          <div style={styles.result}>
            {filteredStudent.name} - {filteredStudent.class}
          </div>
        )}
      </>
    )}

    {view === "class" && (
      <>
        <input
          style={common.input}
          placeholder="כיתה"
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
        />

        {studentsByClass.map((s) => (
          <div style={styles.row} key={s.id}>
            {s.name}
          </div>
        ))}
      </>
    )}

  </div>
</div>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "#f4f6fb",
    minHeight: "100vh",
    fontFamily: "Arial",
  },

  header: {
    textAlign: "center" as const,
    marginBottom: "30px",
  },

  cards: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "wrap" as const,
  },

  card: {
    background: "white",
    padding: "25px",
    borderRadius: "16px",
    width: "160px",
    textAlign: "center" as const,
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  },

  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "25px",
    flexWrap: "wrap" as const,
  },

  content: {
    background: "white",
    padding: "25px",
    borderRadius: "16px",
    minHeight: "200px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  },

  row: {
    padding: "10px 15px",
    borderBottom: "1px solid #eee",
    display: "flex",
    justifyContent: "space-between",
  },

  result: {
    marginTop: "15px",
    padding: "12px",
    background: "#eef2ff",
    borderRadius: "10px",
  },
};