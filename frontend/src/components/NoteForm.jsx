import React, { useState, useEffect } from "react";

export default function NoteForm({ onSubmit, initialValue, submitLabel = "Save" }) {
  const [title, setTitle] = useState(initialValue?.title || "");
  const [content, setContent] = useState(initialValue?.content || "");

  useEffect(() => {
    if (initialValue) {
      setTitle(initialValue.title);
      setContent(initialValue.content);
    }
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
    if (!initialValue) {
      setTitle("");
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
      <button type="submit">{submitLabel}</button>
    </form>
  );
}
