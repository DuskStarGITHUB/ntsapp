import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import 'github-markdown-css/github-markdown.css'
import '../../styles/preview.css'

export default function MarkdownPreview({ content }) {
  return (
    <section className="markdown-body rounded-md p-4 h-full overflow-auto">
      <ScrollArea>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </ScrollArea>
    </section>
  )
}
