import React from "react";
import { Button } from "@/components/ui/button";

export default function NoteItem({ note, isSelected, onClick }) {
  return (
    <Button
      variant={isSelected ? "default" : "ghost"}
      className="w-full justify-start mb-1 text-sm"
      onClick={onClick}
    >
      {note.name}
    </Button>
  );
}
