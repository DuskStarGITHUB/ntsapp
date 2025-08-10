/**
 * @name usesNotes.js
 * @description Functions for Components.
 * @version 1.0.0
 * @created 2025-07-08
 * @updated 2025-08-25
 */

// DEPENDENCIES
import { useState, useEffect, useCallback } from 'react'


// FUNCTIONS
export const useNotes = () => {
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)
  const [content, setContent] = useState('')
  const [baseDir, setBaseDir] = useState(null)
  const fetchNotes = async () => {
    const list = await window.electronAPI.listNotes()
    setNotes(list)
    return list
  }
  const deleteNote = async note => {
    if (!note) return
    const result = await window.electronAPI.deleteNote(note.path)
    if (result.success) {
      setSelectedNote(null)
      await fetchNotes()
    } else {
      alert('Error al eliminar la nota: ' + (result.error || 'Desconocido'))
    }
  }
  const duplicateNote = async note => {
    if (!note) return
    const originalContent = await window.electronAPI.readNote(note.path)
    const baseName = note.name.replace('.md', '')
    let newName = `${baseName}-copy.md`
    let newPath = `${baseDir}/notes/${newName}`
    let count = 1
    while (notes.some(n => n.name === newName)) {
      newName = `${baseName}-copy${count}.md`
      newPath = `${baseDir}/notes/${newName}`
      count++
    }
    await window.electronAPI.saveNote(newPath, originalContent)
    const updatedNotes = await fetchNotes()
    const newNote = updatedNotes.find(n => n.name === newName)
    if (newNote) {
      setSelectedNote(newNote)
    }
  }
  const renameNote = useCallback(async (note, newName) => {
    if (!note || !newName) return
    console.log('🔄 Renombrando nota:', note.name, '→', newName)
    const result = await window.electronAPI.renameNote(note.path, newName)
    if (result.success) {
      const updatedNotes = await fetchNotes()
      const renamedNote = updatedNotes.find(n => n.name === `${newName}.md`)
      if (renamedNote) {
        setSelectedNote(renamedNote)
      }
    } else {
      alert('Error al renombrar la nota: ' + (result.error || 'Desconocido'))
    }
  }, [])
  const createNote = async () => {
    if (!baseDir) return
    let newNoteName = ''
    let newPath = ''
    let count = 1
    do {
      newNoteName = `nueva-nota-${count}.md`
      newPath = `${baseDir}/notes/${newNoteName}`
      count++
    } while (notes.some(n => n.name === newNoteName))
    const newNoteContent = `# Nueva Nota\n\nDescripcion:\n\n---\n- fecha: 00/00/0000\n- ubicacion: ...\n- area:\n---\n\nresumen:\n\n## Contenido\n\n`
    await window.electronAPI.saveNote(newPath, newNoteContent)
    const updatedNotes = await fetchNotes()
    const newNote = updatedNotes.find(n => n.name === newNoteName)
    if (newNote) {
      setSelectedNote(newNote)
    }
  }
  const saveContent = useCallback(
    async newContent => {
      setContent(newContent)
      if (selectedNote) {
        await window.electronAPI.saveNote(selectedNote.path, newContent)
      }
    },
    [selectedNote]
  )
  useEffect(() => {
    window.electronAPI.getBaseDir().then(setBaseDir)
    fetchNotes()
  }, [])
  useEffect(() => {
    if (selectedNote) {
      window.electronAPI.readNote(selectedNote.path).then(setContent)
    } else {
      setContent('')
    }
  }, [selectedNote])
  return {
    notes,
    selectedNote,
    content,
    deleteNote,
    duplicateNote,
    createNote,
    saveContent,
    setSelectedNote,
    renameNote
  }
}
