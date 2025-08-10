/**
 * @file NoteEditor.jsx
 * @description Module React application of Editor Section.
 */

// REACT DEPENDENCIES
import React from 'react'
import NoteTitleInput from './NoteTitleInput'
import Editor from './Editor'
import MarkdownPreview from './MarkdownPreview'

// MODULE
export default function NoteEditor({
  note,
  content,
  onChangeContent,
  onRenameNote
}) {
  if (!note) {
    return (
      <main className="flex-1 flex items-center justify-center text-zinc-600 text-lg select-none bg-transparent">
        Selecciona una nota para editar.
      </main>
    )
  }
  return (
    <main className="flex-1 flex flex-col p-8 bg-transparent space-y-4 overflow-hidden">
      <NoteTitleInput title={note.name} onRename={onRenameNote} note={note} />
      <div className="flex flex-1 gap-4 overflow-hidden">
        <div className="flex-1 flex flex-col h-full overflow-y-auto">
          <Editor
            value={content}
            onChange={onChangeContent}
            className="flex-1 bg-zinc-900 rounded-md"
          />
        </div>
        <div className="flex-1 h-full overflow-y-auto">
          <MarkdownPreview content={content} />
        </div>
      </div>
    </main>
  )
}
