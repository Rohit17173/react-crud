import React, { useState, useEffect } from "react";
import PersonForm from "./PersonForm";
import "./App.css";

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [persons, setPersons] = useState([]);

  const fetchPersons = async () => {
    try {
      const res = await fetch(`${apiUrl}/persons`);
      const data = await res.json();
      setPersons(data);
    } catch (err) {
      console.error("Error fetching persons:", err);
    }
  };

  const handleSave = async (person) => {
    try {
      const res = await fetch(`${apiUrl}/persons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(person),
      });
      if (res.ok) {
        const newPerson = await res.json();
        setPersons([...persons, newPerson]);
      }
    } catch (err) {
      console.error("Error saving person:", err);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  return (
    <div className="App">
      <h1>React CRUD - Persons</h1>
      <PersonForm onSave={handleSave} />
      <div>
        {persons.map((p) => (
          <div key={p.id} className="person-item">
            <strong>{p.name}</strong> ({p.age})
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
