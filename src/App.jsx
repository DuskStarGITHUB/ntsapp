/**
 * @file App.jsx
 * @description The call joined for the React application.
 */

// REACT DEPENDENCIES
import React from 'react'
import Sidebar from './modules/Sidebar/Sidebar'
import NoteEditor from './modules/NoteEditor/NoteEditor'
import { useNotes } from './hooks/useNotes'
import '/styles/global.css'
import '/styles/responsive.css'

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
    renameNote
  } = useNotes()

  return (
    <div className="flex h-screen bg-transparent text-white">
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
        onRenameNote={renameNote}
      />
    </div>
  )
}
