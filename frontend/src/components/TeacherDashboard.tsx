import { useEffect, useState } from "react";
import { getStudents, getTeachers } from "../services/api";
import { commonStyles as common } from "../components/ui/commonStyles";
import MapView from "../components/MapView";
import StudentsList from "./StudentsList";
import TeachersList from "./TeachersList";
import { useNavigate } from "react-router-dom";

export default function TeacherDashboard() {
  const [students, setStudents] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [view, setView] = useState("");
  const [searchId, setSearchId] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const s = await getStudents();
    const t = await getTeachers();
    setStudents(s || []);
    setTeachers(t || []);
  };

  const filteredStudent = students.find((s) => s.id === searchId);

  const studentsByClass = students.filter(
    (s) => s.class === classFilter
  );

  const toggleView = (v: string) => {
    setView(prev => (prev === v ? "" : v));
  };

  return (

    <div style={styles.container}>

      {/* HEADER */}

      <div style={styles.header}>

        {/* RIGHT */}
        <button
          style={styles.homeButton}
          onClick={() => navigate("/")}
        >
          🏠 דף הבית
        </button>

        {/* CENTER */}
        <div style={styles.centerHeader}>
          <h1>מערכת ניהול טיול 🚍</h1>
          <p>שלום, {user?.name || "מורה"} 👋</p>
        </div>

        {/* EMPTY LEFT (לאיזון) */}
        <div style={{ width: "120px" }} />

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


      <div style={styles.bottomSection}>

        {/* RIGHT SIDE - ACTIONS + CONTENT */}
        <div style={styles.rightPanel}>


          {/* ACTIONS */}
          <div style={styles.actionsWrapper}>
             <div style={styles.actionsBox}>
            {/* Button */}
            <div style={styles.actions}><button
              onClick={() => toggleView("students")}
              style={{
                ...styles.actionButton,
                background: view === "students" ? "white" : "#4f46e5",
                color: view === "students" ? "white" : "black",
                transform: view === "students" ? "scale(1.05)" : "scale(1)",
                transition: "all 0.2s ease",
              }}
            >
              תלמידים
            </button>
              {/* Button */}
              <button
                onClick={() => toggleView("teachers")}
                style={{
                  ...styles.actionButton,
                  background: view === "teachers" ?  "white" : "#4f46e5",
                  color: view === "teachers" ? "white" : "black",
                  transform: view === "teachers" ? "scale(1.05)" : "scale(1)",
                  transition: "all 0.2s ease",
                }}
              >
                מורים
              </button>
              {/* Button */}
              <button
                onClick={() => toggleView("search")}
                style={{
                  ...styles.actionButton,
                  background: view === "search" ?  "white" : "#4f46e5",
                  color: view === "search" ? "white" : "black",
                  transform: view === "search" ? "scale(1.05)" : "scale(1)",
                  transition: "all 0.2s ease",
                }}
              >
                חיפוש תלמיד
              </button>
              {/* Button */}
              <button
                onClick={() => toggleView("class")}
                style={{
                  ...styles.actionButton,
                  background: view === "class" ?  "white" : "#4f46e5",
                  color: view === "class" ? "white" : "black",
                  transform: view === "class" ? "scale(1.05)" : "scale(1)",
                  transition: "all 0.2s ease",
                }}
              >
                לפי כיתה
              </button>
            </div>
          </div>
          </div>


          {/* CONTENT */}
          {view && (
            <>
              {/* CONTENT */}
              {view === "students" && (
                <div style={styles.section}>
                  <StudentsList refresh={true} />
                </div>
              )}
              {/* CONTENT */}
              {view === "teachers" && (
                <div style={styles.section}>
                  <TeachersList refresh={true} />
                </div>
              )}
              {/* CONTENT */}
              {view === "search" && (
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>🎯 חיפוש תלמיד לפי ת"ז</h3>

                  <input
                    style={common.input}
                    placeholder="הכנס תעודת זהות"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                  />

                  {searchId && !filteredStudent && (
                    <p style={styles.empty}>לא נמצא תלמיד</p>
                  )}

                  {filteredStudent && (
                    <div style={styles.resultCard}>
                      <p><strong>שם:</strong> {filteredStudent.name}</p>
                      <p><strong>ת"ז:</strong> {filteredStudent.id}</p>
                      <p><strong>כיתה:</strong> {filteredStudent.class}</p>
                    </div>
                  )}
                </div>
              )}
              {/* CONTENT */}
              {view === "class" && (
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>🏫 תלמידים לפי כיתה</h3>

                  <input
                    style={common.input}
                    placeholder="הכנס כיתה"
                    value={classFilter}
                    onChange={(e) => setClassFilter(e.target.value)}
                  />

                  {classFilter && studentsByClass.length === 0 && (
                    <p style={styles.empty}>אין תלמידים בכיתה זו</p>
                  )}

                  {studentsByClass.length > 0 && (
                    <>
                      <div style={styles.headerRow}>
                        <span>שם</span>
                        <span>ת"ז</span>
                        <span>כיתה</span>
                      </div>

                      {studentsByClass.map((s, index) => (
                        <div
                          key={s.id}
                          style={{
                            ...styles.row,
                            background: index % 2 === 0 ? "#fafafa" : "white",
                          }}
                        >
                          <span>{s.name}</span>
                          <span>{s.id}</span>
                          <span>{s.class}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
              {/* CONTENT */}
            </>
          )}

          {/* EMPTY STATE */}
          {!view && (
            <div style={styles.emptyState}>
              בחרי פעולה כדי להתחיל 👆
            </div>
          )}
        </div>
        {/* LEFT SIDE - MAP */}
        <div style={styles.mapBox}>
          <div style={styles.mapTitle}>
            🗺️ מפת תלמידים ומורים
          </div>
          <MapView />
        </div>
      </div>

    </div>
  );
}

const styles = {
  rightPanel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },

  panelContent: {
    background: "white",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    width: "100%",
  },

  mapTitle: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "10px",
    fontSize: "16px",
  },
  container: {
    padding: "30px",
    background: "#f4f6fb",
    minHeight: "100vh",
    fontFamily: "Arial",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  centerHeader: {
    textAlign: "center",
    flex: 1,
    lineHeight: "1.2",
  },

  actionsWrapper: {
    display: "flex",
    justifyContent: "center",
  },
actionsBox: {
  background: "rgba(173, 216, 230, 0.25)", // תכלת שקוף
  backdropFilter: "blur(8px)",              // אפקט זכוכית
  WebkitBackdropFilter: "blur(8px)",        // תמיכה בספארי
  padding: "20px",
  borderRadius: "20px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  border: "1px solid rgba(173, 216, 230, 0.4)",
},
  homeButton: {
    marginTop: "10px",
    padding: "8px 16px",
    borderRadius: "20px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    cursor: "pointer",
  },

  actions: {
    display: "flex",
    gap: "12px",
    marginBottom: "25px",
    flexWrap: "wrap" as const,
    maxWidth: "600px",   // 🔥 זה הקסם
    justifyContent: "center",
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





  actionButton: {
    ...common.button,
    padding: "10px 20px",
    borderRadius: "20px",
  },

  content: {
    background: "white",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    marginBottom: "20px",
  },

  section: {
    maxWidth: "500px",
    margin: "0 auto",
  },

  sectionTitle: {
    textAlign: "center" as const,
    marginBottom: "15px",
  },

  empty: {
    textAlign: "center" as const,
    color: "#888",
    marginTop: "10px",
  },

  emptyState: {
    textAlign: "center" as const,
    color: "#888",
    marginBottom: "20px",
  },

  resultCard: {
    marginTop: "15px",
    padding: "15px",
    borderRadius: "12px",
    background: "#eef2ff",
  },

  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    padding: "10px",
    borderBottom: "1px solid #eee",
  },

  headerRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    fontWeight: "bold",
    padding: "10px",
    borderBottom: "2px solid #ddd",
  },

  mapContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },

  map: {
    width: "80%",
    height: "400px",   // 🔥 חובה
    borderRadius: "16px",
  },

  bottomSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "20px",
    marginTop: "20px",
    flexWrap: "wrap" as const,
  },

  mapBox: {
    width: "55%",
    height: "600px",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
    border: "1px solid #eee",
  },
};