import { useState } from "react";
import api from "../api/axios";

export default function CreateField({ onCreated }) {
  const [name, setName] = useState("");
  const [cropType, setCropType] = useState("");
  const [plantingDate, setPlantingDate] = useState("");
  const [assignedAgentId, setAssignedAgentId] = useState("");

  const handleSubmit = async () => {
    try {
      await api.post("/fields", {
        name,
        cropType,
        plantingDate,
        assignedAgentId,
      });

      alert("Field created");

      setName("");
      setCropType("");
      setPlantingDate("");
      setAssignedAgentId("");

      if (onCreated) onCreated(); // refresh list
    } catch (err) {
      alert(err.response?.data?.message || "Error creating field");
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Create Field</h3>

      <input
        placeholder="Field Name"
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <br />

      <input
        placeholder="Crop Type"
        onChange={(e) => setCropType(e.target.value)}
      />
      <br />
      <br />

      <input type="date" onChange={(e) => setPlantingDate(e.target.value)} />
      <br />
      <br />

      <input
        placeholder="Agent ID"
        onChange={(e) => setAssignedAgentId(e.target.value)}
      />
      <br />
      <br />

      <button onClick={handleSubmit}>Create</button>
    </div>
  );
}
