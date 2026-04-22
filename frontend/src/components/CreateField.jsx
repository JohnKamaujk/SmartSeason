import { useEffect, useState } from "react";
import api from "../api/axios";

export default function CreateField({ onCreated }) {
  const [name, setName] = useState("");
  const [cropType, setCropType] = useState("");
  const [plantingDate, setPlantingDate] = useState("");
  const [agents, setAgents] = useState([]);
  const [assignedAgentId, setAssignedAgentId] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔄 Fetch agents on mount
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

  // 🚀 Submit form
  const handleSubmit = async () => {
    // Validation
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

      // Reset form
      setName("");
      setCropType("");
      setPlantingDate("");
      setAssignedAgentId("");

      // Refresh parent (field list)
      if (onCreated) onCreated();
    } catch (err) {
      alert(err.response?.data?.message || "Error creating field");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h3>Create Field</h3>

      <input
        style={styles.input}
        placeholder="Field Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        style={styles.input}
        placeholder="Crop Type"
        value={cropType}
        onChange={(e) => setCropType(e.target.value)}
      />

      <input
        style={styles.input}
        type="date"
        value={plantingDate}
        onChange={(e) => setPlantingDate(e.target.value)}
      />

      {/* ✅ Agent Dropdown */}
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

      <button style={styles.button} onClick={handleSubmit} disabled={loading}>
        {loading ? "Creating..." : "Create Field"}
      </button>
    </div>
  );
}

const styles = {
  container: {
    marginBottom: 20,
    padding: 20,
    border: "1px solid #ddd",
    borderRadius: 10,
    maxWidth: 400,
  },
  input: {
    display: "block",
    width: "100%",
    marginBottom: 10,
    padding: 8,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  button: {
    padding: 10,
    width: "100%",
    background: "#2E7D32",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
};
