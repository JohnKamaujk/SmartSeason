import { useEffect, useState } from "react";
import api from "../api/axios";
import UpdateField from "./UpdateField";

export default function FieldList() {
  const [fields, setFields] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

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

      {fields.map((field) => (
        <UpdateField
          key={field.id}
          field={field}
          user={user}
          onUpdated={fetchFields}
        />
      ))}
    </div>
  );
}
