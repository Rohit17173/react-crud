import { useState } from "react";

export default function PersonForm({ onSave, initial }) {
  const [name, setName] = useState(initial?.name || "");
  const [age, setAge] = useState(initial?.age || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, age: Number(age) });
    setName("");
    setAge("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        placeholder="Age"
        value={age}
        type="number"
        onChange={(e) => setAge(e.target.value)}
        required
      />

      <button type="submit">Save</button>
    </form>
  );
}
