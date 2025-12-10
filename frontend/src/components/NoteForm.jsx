import React, { useState, useEffect } from "react";

export default function NoteForm({
  onSubmit,
  initialValue,
  submitLabel = "Save",
}) {
  const [title, setTitle] = useState(initialValue?.title || "");
  const [content, setContent] = useState(initialValue?.content || "");

  useEffect(() => {
    if (initialValue) {
      // Editing mode → load values
      setTitle(initialValue.title);
      setContent(initialValue.content);
    } else {
      // Back to "new note" mode → clear form
      setTitle("");
      setContent("");
    }
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });

    // For new notes (no initialValue), keep clearing as before
    if (!initialValue) {
      setTitle("");
      setContent("");
    }
    // For edit:
    // NotesPage will call setEditingNote(null) → initialValue becomes null
    // → useEffect runs and clears the form.
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.9rem",
      }}
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        style={{
          padding: "0.75rem 0.85rem",
          borderRadius: "10px",
          border: "1px solid #d0d0d0",
          fontSize: "0.95rem",
          outline: "none",
        }}
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        style={{
          padding: "0.85rem",
          minHeight: "120px",
          borderRadius: "10px",
          border: "1px solid #d0d0d0",
          fontSize: "0.95rem",
          resize: "vertical",
          outline: "none",
        }}
      />

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "0.9rem",
          background: "#4a5cff",
          color: "white",
          border: "none",
          borderRadius: "10px",
          fontSize: "1rem",
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 6px 15px rgba(74, 92, 255, 0.35)",
          transition: "0.15s ease",
        }}
      >
        {submitLabel}
      </button>
    </form>
  );
}
