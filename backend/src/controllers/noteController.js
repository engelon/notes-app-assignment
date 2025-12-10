const {
  createNote,
  getNotesByUser,
  updateNote,
  deleteNote,
} = require("../models/noteModel");

// POST /notes
async function createNoteHandler(req, res) {
  try {
    const userId = req.user.id;
    const { title, content } = req.body;

    if (!title && !content) {
      return res.status(400).json({ message: "Title or content is required" });
    }

    const note = await createNote(userId, title || "", content || "");
    return res.status(201).json(note);
  } catch (err) {
    console.error("Create note error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// GET /notes
async function getNotesHandler(req, res) {
  try {
    const userId = req.user.id;
    const notes = await getNotesByUser(userId);
    return res.json(notes);
  } catch (err) {
    console.error("Get notes error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// PUT /notes/:id
async function updateNoteHandler(req, res) {
  try {
    const userId = req.user.id;
    const noteId = req.params.id;
    const { title, content } = req.body;

    if (!title && !content) {
      return res.status(400).json({ message: "Title or content is required" });
    }

    const updated = await updateNote(userId, noteId, title || "", content || "");
    if (!updated) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.json(updated);
  } catch (err) {
    console.error("Update note error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// DELETE /notes/:id
async function deleteNoteHandler(req, res) {
  try {
    const userId = req.user.id;
    const noteId = req.params.id;

    const deleted = await deleteNote(userId, noteId);
    if (!deleted) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.status(204).send();
  } catch (err) {
    console.error("Delete note error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createNoteHandler,
  getNotesHandler,
  updateNoteHandler,
  deleteNoteHandler,
};
