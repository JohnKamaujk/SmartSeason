import { useState } from "react";
import api from "../api/axios";

export default function UpdateField({ field, user, onUpdated }) {
  const [stage, setStage] = useState(field.currentStage);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // toggle update UI

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
      setOpen(false);

      if (onUpdated) onUpdated();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const statusColor =
    field.status === "ACTIVE"
      ? "#2E7D32"
      : field.status === "AT_RISK"
        ? "#D32F2F"
        : "#1565C0";

  return (
    <div style={styles.card}>
      {/* HEADER */}
      <div style={styles.header}>
        <h3>{field.name}</h3>
        <span style={{ ...styles.badge, background: statusColor }}>
          {field.status}
        </span>
      </div>

      {/* DETAILS */}
      <p>
        <b>🌱 Crop:</b> {field.cropType}
      </p>
      <p>
        <b>Stage:</b> {field.currentStage}
      </p>
      {/* 📝 Latest Observation */}
      {field.updates && field.updates.length > 0 && (
        <div style={styles.latestUpdate}>
          <p style={styles.latestTitle}>Latest Observation</p>

          <p style={{ margin: 0 }}>{field.updates[0].notes}</p>

          <small style={{ color: "#666" }}>
            {new Date(field.updates[0].createdAt).toLocaleString()}
          </small>
        </div>
      )}

      {/* ACTION */}
      {canUpdate && (
        <>
          <button style={styles.toggleBtn} onClick={() => setOpen(!open)}>
            {open ? "Cancel" : "Update Field"}
          </button>

          {open && (
            <div style={styles.updateBox}>
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
                {loading ? "Updating..." : "Save Update"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: 16,
    padding: 20,
    border: "1px solid #eee",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  badge: {
    padding: "4px 10px",
    borderRadius: 20,
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  toggleBtn: {
    marginTop: 10,
    padding: "6px 12px",
    borderRadius: 6,
    border: "none",
    background: "#eee",
    cursor: "pointer",
  },

  updateBox: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    background: "#fafafa",
    border: "1px solid #eee",
  },

  input: {
    width: "100%",
    padding: 8,
    marginBottom: 8,
    borderRadius: 6,
    border: "1px solid #ccc",
  },

  textarea: {
    width: "100%",
    padding: 8,
    height: 60,
    borderRadius: 6,
    border: "1px solid #ccc",
  },

  button: {
    width: "100%",
    padding: 10,
    borderRadius: 6,
    border: "none",
    background: "#2E7D32",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  latestUpdate: {
    marginTop: 10,
    padding: 10,
    background: "#f5f5f5",
    borderRadius: 10,
    borderLeft: "4px solid #2E7D32",
  },

  latestTitle: {
    margin: "0 0 5px 0",
    fontWeight: "bold",
    fontSize: 13,
    color: "#2E7D32",
  },
};
