import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownPreview({ content }) {
  return (
    <section className="bg-zinc-700 rounded-md p-4 max-h-72 overflow-auto prose prose-invert">
      <ScrollArea>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </ScrollArea>
    </section>
  );
}
