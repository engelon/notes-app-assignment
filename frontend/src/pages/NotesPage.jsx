import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../api/notesApi";
import NotesList from "../components/NotesList.jsx";
import NoteForm from "../components/NoteForm.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

const normalizeNote = (note) => {
  if (!note) return note;
  const id = note.id ?? note._id;
  return { ...note, id };
};

export default function NotesPage() {
  const { token } = useAuth();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingNote, setEditingNote] = useState(null);

  // 🔄 Load notes (reusable)
  const reloadNotes = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchNotes(token);
      setNotes(data.map(normalizeNote));
    } catch {
      setError("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reloadNotes();
  }, [token]);

  const handleCreate = async (note) => {
    setSaving(true);
    setError("");
    try {
      const created = await createNote(token, note);
      setNotes((prev) => [normalizeNote(created), ...prev]);
    } catch {
      setError("Failed to create note");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (note) => {
  if (!editingNote) return;

  setSaving(true);
  setError("");

  try {
    const noteId = editingNote.id ?? editingNote._id;
    await updateNote(token, noteId, note);

    // 🔄 Refresh notes from server so the UI updates 100% accurately
    await reloadNotes();

    // Clear editing state (this also clears the form)
    setEditingNote(null);

  } catch {
    setError("Failed to update note");
  } finally {
    setSaving(false);
  }
};

  const handleDelete = async (noteId) => {
    setError("");
    try {
      await deleteNote(token, noteId);
      setNotes((prev) => prev.filter((n) => n.id !== noteId));
    } catch {
      setError("Failed to delete note");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        fontFamily: "'Inter', 'Avenir', 'Helvetica Neue', system-ui",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "2.5rem 1.5rem 3rem",
        }}
      >
        {/* Header */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.9rem",
            marginBottom: "1.75rem",
          }}
        >
          <img
            src="/appIcon.svg"
            alt="App icon"
            style={{ width: "44px", height: "44px" }}
          />
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "1.9rem",
                fontWeight: 700,
                letterSpacing: "0.02em",
              }}
            >
              Your Notes
            </h1>
            <p
              style={{
                margin: 0,
                marginTop: "0.15rem",
                color: "#666",
                fontSize: "0.95rem",
              }}
            >
              Capture ideas, plans, and everything in between.
            </p>
          </div>
        </header>

        {/* Error */}
        {error && (
          <div style={{ marginBottom: "1rem" }}>
            <ErrorMessage message={error} />
          </div>
        )}

        {/* Main content grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1.6fr)",
            gap: "1.5rem",
          }}
        >
          {/* Left card: Form */}
          <section
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "1.5rem 1.5rem 1.7rem",
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 650 }}>
                {editingNote ? "Edit Note" : "New Note"}
              </h2>

              {editingNote && (
                <button
                  type="button"
                  onClick={() => setEditingNote(null)}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#777",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Cancel edit
                </button>
              )}
            </div>

            <p style={{ margin: 0, fontSize: "0.85rem", color: "#888" }}>
              {saving
                ? "Saving your note..."
                : editingNote
                ? "Update your note and save changes."
                : "Write something and press the big button below."}
            </p>

            <div style={{ marginTop: "0.75rem" }}>
              <NoteForm
                initialValue={editingNote}
                submitLabel={
                  saving
                    ? "Saving..."
                    : editingNote
                    ? "Update note"
                    : "Create note"
                }
                onSubmit={editingNote ? handleUpdate : handleCreate}
              />
            </div>
          </section>

          {/* Right card: List */}
          <section
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "1.5rem 1.5rem 1.1rem",
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
              display: "flex",
              flexDirection: "column",
              minHeight: "260px",
            }}
          >
            {/* Header with Reload button */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "0.75rem",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 650 }}>
                All Notes
              </h2>

              <button
                type="button"
                onClick={reloadNotes}
                style={{
                  padding: "0.35rem 0.8rem",
                  background: "#eef0ff",
                  color: "#4a5cff",
                  border: "1px solid #d4d8ff",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                ↻ Reload
              </button>
            </div>

            {loading ? (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "1.5rem 0",
                }}
              >
                <LoadingSpinner />
              </div>
            ) : (
              <div style={{ flex: 1, minHeight: 0 }}>
                <NotesList
                  notes={notes}
                  onEdit={setEditingNote}
                  onDelete={handleDelete}
                />
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
