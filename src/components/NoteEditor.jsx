import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
      <Input
        value={note.name}
        readOnly
        aria-label="Nombre de la nota"
        className="mb-4 text-lg font-semibold bg-zinc-800 text-white"
      />
      <Textarea
        value={content}
        onChange={(e) => onChangeContent(e.target.value)}
        placeholder="Escribe tu nota en Markdown..."
        className="flex-1 bg-zinc-800 text-white border border-zinc-600 rounded-md p-4 resize-none mb-6 font-mono text-sm"
      />
      <section className="bg-zinc-700 rounded-md p-4 max-h-60 overflow-auto prose prose-invert">
        <ScrollArea>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </ScrollArea>
      </section>
    </main>
  );
}
