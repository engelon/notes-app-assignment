import httpClient from "./httpClient";

export function fetchNotes(token) {
  return httpClient.get("/notes", {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.data);
}

export function createNote(token, note) {
  return httpClient.post("/notes", note, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.data);
}

export function updateNote(token, id, note) {
  return httpClient.put(`/notes/${id}`, note, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => res.data);
}

export function deleteNote(token, id) {
  return httpClient.delete(`/notes/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
