const db = require("../db");

// Create a note
function createNote(userId, title, content) {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO notes (user_id, title, content)
      VALUES (?, ?, ?)
    `;
    db.run(query, [userId, title, content], function (err) {
      if (err) {
        return reject(err);
      }
      resolve({
        id: this.lastID,
        user_id: userId,
        title,
        content,
      });
    });
  });
}

// Get all notes for a user
function getNotesByUser(userId) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT id, user_id, title, content, created_at, updated_at
      FROM notes
      WHERE user_id = ?
      ORDER BY created_at DESC
    `;
    db.all(query, [userId], (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows || []);
    });
  });
}

// Update a note (user must own it)
function updateNote(userId, noteId, title, content) {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE notes
      SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND user_id = ?
    `;
    db.run(query, [title, content, noteId, userId], function (err) {
      if (err) {
        return reject(err);
      }
      if (this.changes === 0) {
        return resolve(null); // not found or not owned
      }
      resolve({ id: noteId, user_id: userId, title, content });
    });
  });
}

// Delete a note (user must own it)
function deleteNote(userId, noteId) {
  return new Promise((resolve, reject) => {
    const query = `
      DELETE FROM notes
      WHERE id = ? AND user_id = ?
    `;
    db.run(query, [noteId, userId], function (err) {
      if (err) {
        return reject(err);
      }
      resolve(this.changes > 0); // true if something was deleted
    });
  });
}

module.exports = {
  createNote,
  getNotesByUser,
  updateNote,
  deleteNote,
};
