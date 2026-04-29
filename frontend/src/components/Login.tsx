import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Login({ onLogin }: any) {
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await login(id);

      localStorage.setItem("token", data.token);
      const decoded = jwtDecode(data.token);
      console.log("USER FROM DB:", decoded);

      //const decoded = JSON.parse(atob(data.token.split(".")[1]));

      onLogin(decoded);
      localStorage.setItem("user", JSON.stringify(decoded));
      

      navigate("/dashboard"); // 🔥 מעבר מסך

    } catch (err) {
      alert("Login failed");
    }
  };

  



  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: "20px" }}>🔐 כניסת מורה</h2>

        <input
          style={styles.input}
          placeholder="תעודת זהות"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          התחברות
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
    width: "320px",
    textAlign: "center" as const,
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    marginBottom: "20px",
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
  },
};