/**
 * @file NoteTilteInput.jsx
 * @description Component React application for Rename Notes.
 */

// REACT DEPENDENCIES
import React, { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'

// COMPONENT
export default function NoteTitleInput({ title, onRename, note }) {
  const [currentTitle, setCurrentTitle] = useState(title.replace('.md', ''))
  const debounceRef = useRef(null)
  useEffect(() => {
    setCurrentTitle(title.replace('.md', ''))
  }, [note])
  const handleChange = e => {
    const value = e.target.value
    setCurrentTitle(value)
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(() => {
      const trimmed = value.trim()
      if (trimmed && trimmed !== title.replace('.md', '')) {
        console.log('🔄 Renombrando a:', trimmed)
        onRename(note, trimmed)
      }
    }, 1000)
  }
  return (
    <Input
      value={currentTitle}
      onChange={handleChange}
      aria-label="Nombre de la nota"
      className="mb-4 text-lg font-semibold bg-zinc-800 text-white"
      placeholder="Nombra tu nota..."
    />
  )
}
