import React, { useEffect, useState } from "react";
import Sidebar from "./modules/Sidebar/Sidebar";
import NoteEditor from "./modules/NoteEditor/NoteEditor";
import "/styles/global.css";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [content, setContent] = useState("");
  const [baseDir, setBaseDir] = useState(null);
  const deleteNote = async (note) => {
    if (!note) return;
    const result = await window.electronAPI.deleteNote(note.path);
    if (result.success) {
      setSelectedNote(null);
      const list = await window.electronAPI.listNotes();
      setNotes(list);
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
    setSelectedNote({ name: newName, path: newPath });
    const list = await window.electronAPI.listNotes();
    setNotes(list);
  };
  useEffect(() => {
    window.electronAPI.getBaseDir().then(setBaseDir);
  }, []);
  useEffect(() => {
    const fetchNotes = async () => {
      const list = await window.electronAPI.listNotes();
      setNotes(list);
    };
    fetchNotes();
    const interval = setInterval(fetchNotes, 3000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (!selectedNote) {
      setContent("");
      return;
    }
    (async () => {
      const text = await window.electronAPI.readNote(selectedNote.path);
      setContent(text);
    })();
  }, [selectedNote]);
  const createNote = async () => {
    if (!baseDir) return;
    const newNoteName = `nota-${Date.now()}.md`;
    const fullPath = `${baseDir}/notes/${newNoteName}`;
    await window.electronAPI.saveNote(fullPath, "# Nueva Nota\n");
    setSelectedNote({ name: newNoteName, path: fullPath });
  };
  const saveContent = async (newContent) => {
    setContent(newContent);
    if (selectedNote) {
      await window.electronAPI.saveNote(selectedNote.path, newContent);
    }
  };
  return (
    <div className="flex h-screen bg-zinc-900 text-white">
      <Sidebar
        notes={notes}
        selectedNote={selectedNote}
        onSelectNote={setSelectedNote}
        onCreateNote={createNote}
        onDeleteNote={deleteNote}
        onDuplicateNote={duplicateNote}
        onRenameNote={null} // deshabilitado renombrar
      />
      <NoteEditor
        note={selectedNote}
        content={content}
        onChangeContent={saveContent}
      />
    </div>
  );
}
