const API = import.meta.env.VITE_API_URL;

export async function getPersons() {
  const res = await fetch(`${API}/persons`);
  return res.json();
}

export async function addPerson(person) {
  const res = await fetch(`${API}/persons`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(person),
  });
  return res.json();
}

export async function updatePerson(id, person) {
  const res = await fetch(`${API}/persons/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(person),
  });
  return res.json();
}

export async function deletePerson(id) {
  await fetch(`${API}/persons/${id}`, {
    method: "DELETE",
  });
}
