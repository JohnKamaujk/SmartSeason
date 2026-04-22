import { useState } from "react";
import api from "../api/axios";

export default function UpdateField({ field, user, onUpdated }) {
  const [stage, setStage] = useState(field.currentStage);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const canUpdate = user.role === "ADMIN" || user.id === field.assignedAgentId;

  const handleUpdate = async () => {
    if (!notes) {
      alert("Add notes before updating");
      return;
    }

    try {
      setLoading(true);

      await api.post(`/fields/${field.id}/update`, {
        stage,
        notes,
      });

      alert("Field updated");

      setNotes("");

      if (onUpdated) onUpdated();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <h3>{field.name}</h3>

      <p>
        <b>Crop:</b> {field.cropType}
      </p>
      <p>
        <b>Current Stage:</b> {field.currentStage}
      </p>
      <p>
        <b>Status:</b> {field.status}
      </p>

      {/* Only show update UI if allowed */}
      {canUpdate && (
        <>
          <select
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            style={styles.input}
          >
            <option value="PLANTED">Planted</option>
            <option value="GROWING">Growing</option>
            <option value="READY">Ready</option>
            <option value="HARVESTED">Harvested</option>
          </select>

          <textarea
            placeholder="Add observations..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={styles.textarea}
          />

          <button
            onClick={handleUpdate}
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Updating..." : "Update Field"}
          </button>
        </>
      )}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
  },
  input: {
    width: "100%",
    marginTop: 10,
    padding: 8,
  },
  textarea: {
    width: "100%",
    marginTop: 10,
    padding: 8,
    height: 70,
  },
  button: {
    marginTop: 10,
    padding: 10,
    background: "#2E7D32",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
};
