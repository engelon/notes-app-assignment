import React from "react";

export default function NotesList({ notes, onEdit, onDelete }) {
  if (!notes || notes.length === 0) {
    return <div>No notes yet.</div>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {notes.map((note) => (
        <li
          key={note.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "4px",
            padding: "0.75rem",
            marginBottom: "0.5rem",
          }}
        >
          <h3 style={{ margin: "0 0 0.25rem" }}>
            {note.title || "(No title)"}
          </h3>
          <p style={{ margin: "0 0 0.5rem" }}>
            {note.content}
          </p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button type="button" onClick={() => onEdit(note)}>
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(note.id)}
              style={{ color: "red" }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
