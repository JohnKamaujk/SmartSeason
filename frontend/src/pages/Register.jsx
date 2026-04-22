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
    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      // store token + user (same as login)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Register</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />

      <br />
      <br />

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <select onChange={(e) => setRole(e.target.value)}>
        <option value="AGENT">Agent</option>
        <option value="ADMIN">Admin</option>
      </select>

      <br />
      <br />

      <button onClick={handleRegister}>Register</button>

      <p>
        Already have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Login
        </span>
      </p>
    </div>
  );
}
