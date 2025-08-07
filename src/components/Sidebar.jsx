import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import NoteItem from "./NoteItem";

export default function Sidebar({
  notes,
  selectedNote,
  onSelectNote,
  onCreateNote,
}) {
  return (
    <aside className="w-80 p-6 border-r border-zinc-700 flex flex-col bg-zinc-950">
      <h2 className="text-2xl font-bold mb-6">Notas</h2>
      <ScrollArea className="flex-1 mb-4">
        {notes.length === 0 && (
          <p className="text-zinc-500 italic select-none">No hay notas aún</p>
        )}
        {notes.map((note) => (
          <NoteItem
            key={note.name}
            note={note}
            isSelected={selectedNote?.name === note.name}
            onClick={() => onSelectNote(note)}
          />
        ))}
      </ScrollArea>
      <Button variant="secondary" className="w-full" onClick={onCreateNote}>
        + Nueva Nota
      </Button>
    </aside>
  );
}
