export default function DashboardCards({ teachers, students }: any) {
  return (
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
  );
}

const styles = {
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
};