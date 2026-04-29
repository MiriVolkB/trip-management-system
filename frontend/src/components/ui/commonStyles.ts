export const commonStyles = {
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
    width: "320px",
    textAlign: "center" as const,
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },

  title: {
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    marginBottom: "15px",
    fontSize: "16px",
  },

  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "30px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.2s",
  },
};

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