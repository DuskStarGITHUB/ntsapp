/**
 * @file Siderbar.jsx
 * @description The call joined for the Module SiderBAr.
 */

// REACT DEPENDENCIES
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card } from '@/components/ui/card'
import NoteItem from './NoteItem'
import MenuDrop from './MenuDrop'

// MODULE
export default function Sidebar({
  notes,
  selectedNote,
  onSelectNote,
  onCreateNote,
  onDeleteNote,
  onDuplicateNote
}) {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    note: null
  })
  const handleContextMenu = (e, note) => {
    e.preventDefault()
    setContextMenu({
      visible: true,
      x: e.pageX,
      y: e.pageY,
      note
    })
  }
  const closeContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, note: null })
  }
  return (
    <aside className="w-80 p-6 border-r border-zinc-700 flex flex-col bg-zinc-950 relative">
      <Card className="p-4 mb-4 bg-zinc-900 border-zinc-800">
        <h2 className="text-5xl font-semibold text-center text-white">Notas</h2>
      </Card>
      <ScrollArea className="flex-1 mb-4">
        {notes.length === 0 ? (
          <p className="text-zinc-500 italic select-none">No hay notas aún</p>
        ) : (
          notes.map(note => (
            <NoteItem
              key={note.name}
              note={note}
              isSelected={selectedNote?.name === note.name}
              onClick={() => onSelectNote(note)}
              onContextMenu={handleContextMenu}
            />
          ))
        )}
      </ScrollArea>
      <Button variant="secondary" className="w-full" onClick={onCreateNote}>
        + Nueva Nota
      </Button>
      {contextMenu.visible && (
        <MenuDrop
          x={contextMenu.x}
          y={contextMenu.y}
          note={contextMenu.note}
          onDuplicate={onDuplicateNote}
          onDelete={onDeleteNote}
          onClose={closeContextMenu}
        />
      )}
    </aside>
  )
}
