/**
 * @file MarkdownPreview.jsx
 * @description Component React application Preview Notes Render.
 */

// REACT DEPENDENCIES
import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import 'github-markdown-css/github-markdown.css'
import '../../styles/preview.css'

// COMPONENT
export default function MarkdownPreview({ content }) {
  return (
    <section className="markdown-preview-container">
      <ScrollArea className="w-full h-full">
        <div className="markdown-body p-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </ScrollArea>
    </section>
  )
}