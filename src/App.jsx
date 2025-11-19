import { useEffect, useState } from "react";
import { getPersons, addPerson, updatePerson, deletePerson } from "./api";
import PersonForm from "./PersonForm";
import PersonList from "./PersonList";

export default function App() {
  const [persons, setPersons] = useState([]);
  const [editing, setEditing] = useState(null);

  const loadData = async () => {
    const data = await getPersons();
    setPersons(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (person) => {
    if (editing) {
      await updatePerson(editing.id, person);
      setEditing(null);
    } else {
      await addPerson(person);
    }
    loadData();
  };

  const handleDelete = async (id) => {
    await deletePerson(id);
    loadData();
  };

  return (
    <div className="App">
  <h1>React CRUD for .NET API</h1>

  <PersonForm onSave={handleSave} initial={editing} />

  {persons.map((p) => (
    <div key={p.id} className="person-item">
      <strong>{p.name}</strong> ({p.age})
      <div>
        <button onClick={() => setEditing(p)}>Edit</button>
        <button className="delete" onClick={() => handleDelete(p.id)}>Delete</button>
      </div>
    </div>
  ))}
</div>
  );
}
