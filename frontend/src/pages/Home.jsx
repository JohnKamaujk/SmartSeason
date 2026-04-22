import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🌱 SmartSeason</h1>
        <p style={styles.subtitle}>
          Monitor your fields. Track crop progress. Make smarter decisions.
        </p>

        <div style={styles.buttons}>
          <button style={styles.loginBtn} onClick={() => navigate("/login")}>
            Login
          </button>

          <button
            style={styles.registerBtn}
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
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
    color: "#fff",
  },
  card: {
    textAlign: "center",
    background: "rgba(255,255,255,0.1)",
    padding: "40px",
    borderRadius: "16px",
    backdropFilter: "blur(10px)",
    width: "350px",
  },
  title: {
    fontSize: "32px",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "14px",
    marginBottom: "30px",
    opacity: 0.9,
  },
  buttons: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  loginBtn: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    background: "#fff",
    color: "#2E7D32",
    cursor: "pointer",
  },
  registerBtn: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    background: "#1B5E20",
    color: "#fff",
    cursor: "pointer",
  },
};
