import React from "react";
import NoteTitleInput from "./NoteTitleInput";
import NoteContentTextarea from "./NoteContentTextarea";
import MarkdownPreview from "./MarkdownPreview";

export default function NoteEditor({ note, content, onChangeContent }) {
  if (!note) {
    return (
      <main className="flex-1 flex items-center justify-center text-zinc-600 text-lg select-none">
        Selecciona una nota para editar.
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col p-8 bg-zinc-900">
      <NoteTitleInput title={note.name} />
      <NoteContentTextarea value={content} onChange={onChangeContent} />
      <MarkdownPreview content={content} />
    </main>
  );
}
