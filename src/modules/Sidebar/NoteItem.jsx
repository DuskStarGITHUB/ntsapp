import React from "react";
import { Button } from "@/components/ui/button";

export default function NoteItem({ note, isSelected, onClick, onContextMenu }) {
  return (
    <Button
      variant={isSelected ? "default" : "ghost"}
      className="w-full justify-start mb-1 text-sm"
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextMenu(e, note);
      }}
    >
      {note.name}
    </Button>
  );
}
