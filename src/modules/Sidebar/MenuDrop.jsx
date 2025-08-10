/**
 * @file MenuDrop.jsx
 * @description Clcik Right Menu.
 */

// REACT DEPENDENCIES
import { useEffect, useRef } from 'react'

// COMPONENT
export default function MenuDrop({
  x,
  y,
  note,
  onDuplicate,
  onDelete,
  onClose
}) {
  const menuRef = useRef()
  useEffect(() => {
    const handleClickOutside = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])
  return (
    <div
      ref={menuRef}
      className="absolute z-50 bg-zinc-800 text-white border border-zinc-600 rounded shadow-lg w-48"
      style={{ top: y, left: x }}
    >
      <button
        className="w-full px-4 py-2 hover:bg-zinc-700 text-left"
        onClick={() => {
          onDuplicate(note)
          onClose()
        }}
      >
        Duplicar
      </button>
      <button
        className="w-full px-4 py-2 hover:bg-red-600 text-left text-red-400"
        onClick={() => {
          onDelete(note)
          onClose()
        }}
      >
        Eliminar
      </button>
    </div>
  )
}
