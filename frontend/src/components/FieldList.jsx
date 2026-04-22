import { useEffect, useState } from "react";
import api from "../api/axios";

export default function FieldList() {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
    try {
      const res = await api.get("/fields");
      setFields(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!fields.length) return <p>No fields found</p>;

  return (
    <div>
      <h3>Fields</h3>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Crop</th>
            <th>Stage</th>
            <th>Status</th>
            <th>Agent</th>
          </tr>
        </thead>

        <tbody>
          {fields.map((field) => (
            <tr key={field.id}>
              <td>{field.name}</td>
              <td>{field.cropType}</td>
              <td>{field.currentStage}</td>
              <td>{field.status}</td>
              <td>{field.assignedAgent?.name || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
