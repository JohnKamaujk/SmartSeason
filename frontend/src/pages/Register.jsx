import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("AGENT");

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🌱 SmartSeason</h1>
        <p style={styles.subtitle}>Create your account</p>

        <input
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Role (optional for assessment) */}
        <select
          style={styles.input}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="AGENT">Agent</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button style={styles.button} onClick={handleRegister}>
          Register
        </button>

        <p style={styles.linkText}>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
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
    background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
  },

  card: {
    width: 350,
    padding: 30,
    borderRadius: 16,
    background: "#fff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    textAlign: "center",
  },

  title: {
    marginBottom: 5,
  },

  subtitle: {
    marginBottom: 20,
    color: "#666",
  },

  input: {
    width: "100%",
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    border: "1px solid #ccc",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    border: "none",
    background: "#2E7D32",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },

  linkText: {
    marginTop: 15,
    fontSize: 14,
  },

  link: {
    color: "#2E7D32",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
