import React from "react";
import { Textarea } from "@/components/ui/textarea";

export default function NoteContentTextarea({ value, onChange }) {
  return (
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Escribe tu nota en Markdown..."
      className="flex-1 bg-zinc-900 text-white border border-zinc-600 rounded-md p-4 resize-none mb-6 font-mono text-sm overflow-auto h-full"
    />
  );
}
