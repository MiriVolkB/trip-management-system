import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={{ marginBottom: "30px" }}>
          מערכת ניהול טיול
        </h1>

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
          ➕ הוספת מורה
        </button>

        <div style={{ margin: "20px 0" }} />

        <button
          style={{ ...styles.button, background: "#10b981" }}
          onClick={() => navigate("/login")}
        >
          🔐 כניסת מורה
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6fb",
  },

  card: {
    background: "white",
    padding: "40px",
    borderRadius: "16px",
    width: "350px",
    textAlign: "center" as const,
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },

  button: {
    width: "100%",
    padding: "16px",
    borderRadius: "30px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    fontSize: "16px",
    marginBottom: "12px",
    cursor: "pointer",
  },
};