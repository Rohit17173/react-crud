import { useState, useEffect } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  const [persons, setPersons] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch persons from backend
  const fetchPersons = async () => {
    try {
      const res = await fetch(`${apiUrl}/persons`);
      const data = await res.json();
      setPersons(data);
    } catch (err) {
      console.error("Error fetching persons:", err);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  // Add or Update person
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { name, age: parseInt(age) };

    try {
      if (editingId) {
        // Update
        await fetch(`${apiUrl}/persons/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        setEditingId(null);
      } else {
        // Create
        await fetch(`${apiUrl}/persons`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      setName("");
      setAge("");
      fetchPersons();
    } catch (err) {
      console.error("Error saving person:", err);
    }
  };

  // Delete person
  const handleDelete = async (id) => {
    try {
      await fetch(`${apiUrl}/persons/${id}`, { method: "DELETE" });
      fetchPersons();
    } catch (err) {
      console.error("Error deleting person:", err);
    }
  };

  // Edit person
  const handleEdit = (person) => {
    setEditingId(person.id);
    setName(person.name);
    setAge(person.age);
  };

  return (
    <div className="container">
      <h1>Persons CRUD</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <button type="submit">{editingId ? "Update" : "Add"}</button>
      </form>

      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} ({person.age} years)
            <button onClick={() => handleEdit(person)}>Edit</button>
            <button onClick={() => handleDelete(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
