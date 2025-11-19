export default function PersonList({ persons, onEdit, onDelete }) {
  return (
    <div>
      {persons.map((p) => (
        <div key={p.id} style={{ marginBottom: "10px" }}>
          <strong>{p.name}</strong> ({p.age})
          <button onClick={() => onEdit(p)} style={{ marginLeft: "10px" }}>
            Edit
          </button>
          <button onClick={() => onDelete(p.id)} style={{ marginLeft: "10px" }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
