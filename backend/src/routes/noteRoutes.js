const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  createNoteHandler,
  getNotesHandler,
  updateNoteHandler,
  deleteNoteHandler,
} = require("../controllers/noteController");

// Protect all /notes routes
router.use(authMiddleware);

// POST /notes
router.post("/", createNoteHandler);

// GET /notes
router.get("/", getNotesHandler);

// PUT /notes/:id
router.put("/:id", updateNoteHandler);

// DELETE /notes/:id
router.delete("/:id", deleteNoteHandler);

module.exports = router;
