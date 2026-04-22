import { useEffect, useState } from "react";
import api from "../api/axios";
import UpdateField from "./UpdateField";

export default function FieldList() {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
    try {
      setLoading(true);
      const res = await api.get("/fields");
      setFields(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading fields...</p>;
  if (!fields.length) return <p>No fields found</p>;

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>🌾 Fields</h2>

      <div style={styles.grid}>
        {fields.map((field) => (
          <UpdateField
            key={field.id}
            field={field}
            user={user}
            onUpdated={fetchFields}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 20,
  },
};
