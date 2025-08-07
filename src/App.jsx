import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import NoteEditor from "./components/NoteEditor";
import "/styles/global.css"

export default function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [content, setContent] = useState("");
  const [baseDir, setBaseDir] = useState(null);

  useEffect(() => {
    window.electronAPI.getBaseDir().then(setBaseDir);
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      const list = await window.electronAPI.listNotes();
      setNotes(list);
    };
    fetchNotes();
    const interval = setInterval(fetchNotes, 2000);
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
      />
      <NoteEditor
        note={selectedNote}
        content={content}
        onChangeContent={saveContent}
      />
    </div>
  );
}
