import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { fetchNotes, createNote, updateNote, deleteNote } from "../api/notesApi";
import NotesList from "../components/NotesList.jsx";
import NoteForm from "../components/NoteForm.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

export default function NotesPage() {
  const { token } = useAuth();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await fetchNotes(token);
        setNotes(data);
      } catch {
        setError("Failed to load notes");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token]);

  const handleCreate = async (note) => {
    setSaving(true);
    setError("");
    try {
      const created = await createNote(token, note);
      setNotes((prev) => [created, ...prev]);
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
      const updated = await updateNote(token, editingNote.id, note);
      setNotes((prev) =>
        prev.map((n) => (n.id === updated.id ? updated : n))
      );
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
    <div>
      <h2>Your Notes</h2>
      <ErrorMessage message={error} />

      <h3>{editingNote ? "Edit Note" : "New Note"}</h3>

      <NoteForm
        initialValue={editingNote}
        submitLabel={saving ? "Saving..." : editingNote ? "Update" : "Create"}
        onSubmit={editingNote ? handleUpdate : handleCreate}
      />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <NotesList
          notes={notes}
          onEdit={setEditingNote}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
