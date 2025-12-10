import React, { useState } from "react";

export default function NotesList({ notes, onEdit, onDelete }) {
  const [expandedId, setExpandedId] = useState(null);

  if (!notes || notes.length === 0) {
    return (
      <div
        style={{
          padding: "1rem",
          textAlign: "center",
          color: "#777",
          fontStyle: "italic",
        }}
      >
        No notes yet.
      </div>
    );
  }

  const toggleExpanded = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getFirstLine = (text) => {
    if (!text) return "";
    const first = text.split("\n")[0];
    return first.length > 80 ? first.slice(0, 80) + "…" : first;
  };

  return (
    <div
      style={{
        height: "100%",
        maxHeight: "calc(100vh - 260px)",
        overflowY: "auto",
        paddingRight: "0.25rem",
      }}
    >
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {notes.map((note) => {
          const isExpanded = expandedId === note.id;
          const preview = getFirstLine(note.content);

          return (
            <li
              key={note.id}
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "0.9rem",
                marginBottom: "0.7rem",
                boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
                display: "flex",
                gap: "0.75rem",
              }}
            >
              {/* Left side */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Title + big arrow */}
                <button
                  onClick={() => toggleExpanded(note.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.4rem",
                      width: "1.6rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {isExpanded ? "▾" : "▸"}
                  </span>
                  <span
                    style={{
                      fontWeight: 650,
                      fontSize: "1rem",
                      color: "#222",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {note.title || "(No title)"}
                  </span>
                </button>

                {/* Content */}
                <div
                  style={{
                    marginTop: "0.25rem",
                    color: "#555",
                    fontSize: "0.9rem",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {isExpanded ? note.content : preview}
                </div>
              </div>

              {/* Buttons right side */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.3rem",
                  minWidth: "70px",
                  alignItems: "flex-end",
                }}
              >
                <button
                  onClick={() => onEdit(note)}
                  style={{
                    padding: "0.25rem 0.55rem",
                    borderRadius: "999px",
                    border: "1px solid #4a5cff",
                    background: "white",
                    color: "#4a5cff",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(note.id)}
                  style={{
                    padding: "0.25rem 0.55rem",
                    borderRadius: "999px",
                    border: "1px solid #ff4f4f",
                    background: "white",
                    color: "#ff4f4f",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
