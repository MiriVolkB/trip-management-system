import { useState } from "react";
import { login } from "../services/authService";

export default function Login() {
  const [id, setId] = useState("");

  const handleLogin = async () => {
    try {
      const data = await login(id);
      localStorage.setItem("token", data.token);
      
// Decode the JWT token to get the payload
      const decoded = JSON.parse(atob(data.token.split(".")[1]));
console.log(decoded);

      alert("Login successful!");
      console.log(data);
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Enter ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}