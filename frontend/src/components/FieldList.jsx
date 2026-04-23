import UpdateField from "./UpdateField";

export default function FieldList({ fields, onUpdated }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!fields) return <p>Loading fields...</p>;
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
            onUpdated={onUpdated}
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
