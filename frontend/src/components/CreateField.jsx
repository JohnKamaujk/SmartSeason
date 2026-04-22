import { useEffect, useState } from "react";
import api from "../api/axios";

export default function CreateField({ onCreated }) {
  const [name, setName] = useState("");
  const [cropType, setCropType] = useState("");
  const [plantingDate, setPlantingDate] = useState("");
  const [agents, setAgents] = useState([]);
  const [assignedAgentId, setAssignedAgentId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const res = await api.get("/users/agents");
      setAgents(res.data);
    } catch (err) {
      console.error("Error fetching agents:", err);
    }
  };

  const handleSubmit = async () => {
    if (!name || !cropType || !plantingDate || !assignedAgentId) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await api.post("/fields", {
        name,
        cropType,
        plantingDate,
        assignedAgentId,
      });

      alert("Field created successfully");

      setName("");
      setCropType("");
      setPlantingDate("");
      setAssignedAgentId("");

      if (onCreated) onCreated();
    } catch (err) {
      alert(err.response?.data?.message || "Error creating field");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>🌾 Create New Field</h2>
      <p style={styles.subtitle}>Assign a field to a field agent</p>

      <div style={styles.formGroup}>
        <label>Field Name</label>
        <input
          style={styles.input}
          placeholder="e.g. North Farm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div style={styles.formGroup}>
        <label>Crop Type</label>
        <input
          style={styles.input}
          placeholder="e.g. Maize"
          value={cropType}
          onChange={(e) => setCropType(e.target.value)}
        />
      </div>

      <div style={styles.formGroup}>
        <label>Planting Date</label>
        <input
          style={styles.input}
          type="date"
          value={plantingDate}
          onChange={(e) => setPlantingDate(e.target.value)}
        />
      </div>

      <div style={styles.formGroup}>
        <label>Assign Agent</label>
        <select
          style={styles.input}
          value={assignedAgentId}
          onChange={(e) => setAssignedAgentId(e.target.value)}
        >
          <option value="">Select Agent</option>
          {agents.map((agent) => (
            <option key={agent.id} value={agent.id}>
              {agent.name} ({agent.email})
            </option>
          ))}
        </select>
      </div>

      <button
        style={{
          ...styles.button,
          opacity: loading ? 0.7 : 1,
          cursor: loading ? "not-allowed" : "pointer",
        }}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Field"}
      </button>
    </div>
  );
}

const styles = {
  card: {
    maxWidth: 450,
    padding: 25,
    borderRadius: 16,
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    border: "1px solid #eee",
  },

  title: {
    marginBottom: 5,
  },

  subtitle: {
    marginBottom: 20,
    color: "#666",
    fontSize: 14,
  },

  formGroup: {
    marginBottom: 15,
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },

  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
    outline: "none",
  },

  button: {
    marginTop: 10,
    width: "100%",
    padding: 12,
    borderRadius: 8,
    border: "none",
    background: "#2E7D32",
    color: "#fff",
    fontWeight: "bold",
  },
};
