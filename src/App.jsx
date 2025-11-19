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
    <div style={{ padding: "20px" }}>
      <h1>React CRUD for .NET API</h1>

      <PersonForm onSave={handleSave} initial={editing} />

      <PersonList
        persons={persons}
        onEdit={(p) => setEditing(p)}
        onDelete={handleDelete}
      />
    </div>
  );
}
