import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* NAVBAR */}
      <div style={styles.nav}>
        <h2 style={{ margin: 0 }}>🌱 SmartSeason</h2>

        <div>
          <button style={styles.navBtn} onClick={() => navigate("/login")}>
            Login
          </button>
          <button
            style={styles.navPrimary}
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* HERO */}
      <div style={styles.hero}>
        <h1 style={styles.title}>
          Monitor Crops. Track Growth. <br /> Make Better Decisions.
        </h1>

        <p style={styles.subtitle}>
          SmartSeason helps coordinators and field agents track crop progress
          across multiple fields with real-time updates and insights.
        </p>

        <div style={styles.cta}>
          <button style={styles.primary} onClick={() => navigate("/register")}>
            Get Started
          </button>
          <button style={styles.secondary} onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div style={styles.features}>
        <div style={styles.featureCard}>
          <h3>🌾 Field Monitoring</h3>
          <p>Track crop stages from planting to harvest in one place.</p>
        </div>

        <div style={styles.featureCard}>
          <h3>👨‍🌾 Agent Updates</h3>
          <p>Field agents provide real-time updates and observations.</p>
        </div>

        <div style={styles.featureCard}>
          <h3>📊 Insights</h3>
          <p>Get a clear overview of field status and risks.</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
    color: "#fff",
    padding: "20px 40px",
    fontFamily: "Arial, sans-serif",
  },

  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 60,
  },

  navBtn: {
    marginRight: 10,
    padding: "8px 14px",
    borderRadius: 6,
    border: "none",
    background: "transparent",
    color: "#fff",
    cursor: "pointer",
  },

  navPrimary: {
    padding: "8px 14px",
    borderRadius: 6,
    border: "none",
    background: "#fff",
    color: "#2E7D32",
    fontWeight: "bold",
    cursor: "pointer",
  },

  hero: {
    maxWidth: 700,
    marginBottom: 60,
  },

  title: {
    fontSize: "40px",
    fontWeight: "bold",
    marginBottom: 20,
    lineHeight: 1.2,
  },

  subtitle: {
    fontSize: 16,
    opacity: 0.9,
    marginBottom: 30,
  },

  cta: {
    display: "flex",
    gap: 15,
  },

  primary: {
    padding: "12px 20px",
    borderRadius: 8,
    border: "none",
    background: "#fff",
    color: "#2E7D32",
    fontWeight: "bold",
    cursor: "pointer",
  },

  secondary: {
    padding: "12px 20px",
    borderRadius: 8,
    border: "1px solid #fff",
    background: "transparent",
    color: "#fff",
    cursor: "pointer",
  },

  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 20,
  },

  featureCard: {
    background: "rgba(255,255,255,0.1)",
    padding: 20,
    borderRadius: 12,
    backdropFilter: "blur(10px)",
  },
};
