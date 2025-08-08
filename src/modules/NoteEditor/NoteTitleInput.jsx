import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

export default function NoteTitleInput({ title, onRename, note }) {
  const [currentTitle, setCurrentTitle] = useState(title.replace(".md", ""));
  useEffect(() => {
    setCurrentTitle(title.replace(".md", ""));
  }, [title]);
  useEffect(() => {
    const originalTitle = title.replace(".md", "");
    if (currentTitle === originalTitle) {
      return;
    }
    const handler = setTimeout(() => {
      const trimmedTitle = currentTitle.trim();
      if (trimmedTitle && trimmedTitle !== originalTitle) {
        onRename(note, trimmedTitle);
      }
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [currentTitle, note, title, onRename]);
  return (
    <Input
      value={currentTitle}
      onChange={(e) => setCurrentTitle(e.target.value)}
      aria-label="Nombre de la nota"
      className="mb-4 text-lg font-semibold bg-zinc-800 text-white"
      placeholder="Nombra tu nota..."
    />
  );
}
