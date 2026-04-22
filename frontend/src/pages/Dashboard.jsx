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

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: 40 }}>
      <h2>{user.role} Dashboard</h2>

      <p>Total Fields: {data.totalFields}</p>

      <h3>Status Breakdown</h3>
      <ul>
        <li>Active: {data.statusBreakdown.ACTIVE}</li>
        <li>At Risk: {data.statusBreakdown.AT_RISK}</li>
        <li>Completed: {data.statusBreakdown.COMPLETED}</li>
      </ul>

      {/* Admin only */}
      {user.role === "ADMIN" && (
        <CreateField onCreated={() => window.location.reload()} />
      )}

      <FieldList />
    </div>
  );
}
