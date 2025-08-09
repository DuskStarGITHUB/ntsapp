import { useState, useEffect, useCallback } from "react";

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [content, setContent] = useState("");
  const [baseDir, setBaseDir] = useState(null);
  const fetchNotes = async () => {
    const list = await window.electronAPI.listNotes();
    setNotes(list);
  };
  const deleteNote = async (note) => {
    if (!note) return;
    const result = await window.electronAPI.deleteNote(note.path);
    if (result.success) {
      setSelectedNote(null);
      await fetchNotes(); // Ensure notes are updated before setting selectedNote
    } else {
      alert("Error al eliminar la nota: " + (result.error || "Desconocido"));
    }
  };
  const duplicateNote = async (note) => {
    if (!note) return;
    const originalContent = await window.electronAPI.readNote(note.path);
    const baseName = note.name.replace(".md", "");
    let newName = `${baseName}-copy.md`;
    let newPath = `${baseDir}/notes/${newName}`;
    let count = 1;
    while (notes.some((n) => n.name === newName)) {
      newName = `${baseName}-copy${count}.md`;
      newPath = `${baseDir}/notes/${newName}`;
      count++;
    }
    await window.electronAPI.saveNote(newPath, originalContent);
    await fetchNotes(); // Ensure notes are updated before setting selectedNote
    const newNote = notes.find((n) => n.name === newName);
    if (newNote) {
      setSelectedNote(newNote);
    }
  };
  const renameNote = async (note, newName) => {
    if (!note || !newName) return;
    const result = await window.electronAPI.renameNote(note.path, newName);
    if (result.success) {
      await fetchNotes(); // Ensure notes are updated before setting selectedNote
      const newNote = notes.find((n) => n.name === `${newName}.md`);
      if (newNote) {
        setSelectedNote(newNote);
      }
    } else {
      alert("Error al renombrar la nota: " + (result.error || "Desconocido"));
    }
  };
  const createNote = async () => {
    if (!baseDir) return;
    const newNoteName = `nota-${Date.now()}.md`;
    const fullPath = `${baseDir}/notes/${newNoteName}`;
    await window.electronAPI.saveNote(fullPath, "# Nueva Nota");
    await fetchNotes(); // Ensure notes are updated before setting selectedNote
    const newNote = notes.find((n) => n.name === newNoteName);
    if (newNote) {
      setSelectedNote(newNote);
    }
  };
  const saveContent = useCallback(async (newContent) => {
    if (newContent !== content) { // Only update if content has actually changed
      setContent(newContent);
      if (selectedNote) {
        await window.electronAPI.saveNote(selectedNote.path, newContent);
      }
    }
  }, [selectedNote]); // Dependencies for useCallback
  useEffect(() => {
    window.electronAPI.getBaseDir().then(setBaseDir);
    fetchNotes();
  }, []);
  useEffect(() => {
    if (selectedNote) {
      window.electronAPI.readNote(selectedNote.path).then(setContent);
    } else {
      setContent("");
    }
  }, [selectedNote]);
  return {
    notes,
    selectedNote,
    content,
    deleteNote,
    duplicateNote,
    createNote,
    saveContent,
    setSelectedNote,
    renameNote,
  };
};