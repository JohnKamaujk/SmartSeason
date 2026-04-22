import { useEffect, useState } from "react";
import api from "../api/axios";
import CreateField from "../components/CreateField";
import FieldList from "../components/FieldList";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await api.get("/dashboard");
      setData(res.data);
    };

    fetchDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  if (!data) return <p style={{ padding: 40 }}>Loading...</p>;

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2>🌱 SmartSeason</h2>
          <p style={{ opacity: 0.7 }}>
            {user.role} • {user.email}
          </p>
        </div>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* METRICS */}
      <div style={styles.metrics}>
        <div style={styles.card}>
          <h3>Total Fields</h3>
          <p style={styles.metric}>{data.totalFields}</p>
        </div>

        <div style={styles.card}>
          <h3>Active</h3>
          <p style={{ ...styles.metric, color: "#2E7D32" }}>
            {data.statusBreakdown.ACTIVE}
          </p>
        </div>

        <div style={styles.card}>
          <h3>At Risk</h3>
          <p style={{ ...styles.metric, color: "#D32F2F" }}>
            {data.statusBreakdown.AT_RISK}
          </p>
        </div>

        <div style={styles.card}>
          <h3>Completed</h3>
          <p style={{ ...styles.metric, color: "#1565C0" }}>
            {data.statusBreakdown.COMPLETED}
          </p>
        </div>
      </div>

      {/* ADMIN SECTION */}
      {user.role === "ADMIN" && (
        <div style={styles.section}>
          <h3>Create New Field</h3>
          <CreateField onCreated={() => window.location.reload()} />
        </div>
      )}

      {/* FIELD LIST */}
      <div style={styles.section}>
        <h3>Field Monitoring</h3>
        <FieldList />
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 30,
    maxWidth: 1200,
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  logoutBtn: {
    padding: "8px 16px",
    background: "#D32F2F",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },

  metrics: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 20,
    marginBottom: 30,
  },

  card: {
    padding: 20,
    borderRadius: 12,
    border: "1px solid #eee",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    background: "#fff",
  },

  metric: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
  },

  section: {
    marginTop: 30,
    padding: 20,
    borderRadius: 12,
    background: "#fafafa",
    border: "1px solid #eee",
  },
};
