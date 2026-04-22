import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [data, setData] = useState(null);

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
      <h2>Dashboard</h2>

      <p>Total Fields: {data.totalFields}</p>

      <h3>Status Breakdown</h3>
      <pre>{JSON.stringify(data.statusBreakdown, null, 2)}</pre>

      <h3>Recent Updates</h3>
      <pre>{JSON.stringify(data.recentUpdates, null, 2)}</pre>
    </div>
  );
}
