import React from "react";
import Sidebar from "./modules/Sidebar/Sidebar";
import NoteEditor from "./modules/NoteEditor/NoteEditor";
import { useNotes } from "./hooks/useNotes";
import "/styles/global.css";

export default function App() {
  const {
    notes,
    selectedNote,
    content,
    deleteNote,
    duplicateNote,
    createNote,
    saveContent,
    setSelectedNote,
  } = useNotes();

  return (
    <div className="flex h-screen bg-zinc-900 text-white">
      <Sidebar
        notes={notes}
        selectedNote={selectedNote}
        onSelectNote={setSelectedNote}
        onCreateNote={createNote}
        onDeleteNote={deleteNote}
        onDuplicateNote={duplicateNote}
      />
      <NoteEditor
        note={selectedNote}
        content={content}
        onChangeContent={saveContent}
      />
    </div>
  );
}
