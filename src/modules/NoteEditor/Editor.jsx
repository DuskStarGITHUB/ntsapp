/**
 * @file Editor.jsx
 * @description Editor Component for App.
 */

// REACT DEPENDENCIES
import React, { useCallback, useRef, useEffect } from 'react'
import useCodeMirror from '../../lib/use-codemirror'
import '../../styles/editor.css'

// COMPONENT
const Editor = ({ value, onChange }) => {
  const onChangeRef = useRef(onChange)
  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])
  const timeoutRef = useRef(null)
  const editorViewRef = useRef(null)
  const onEditorChange = useCallback(() => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      const handler = onChangeRef.current
      if (handler && editorViewRef.current) {
        const currentDoc = editorViewRef.current.state.doc.toString()
        handler(currentDoc)
      }
    }, 300)
  }, [])
  const [refContainer, editorView] = useCodeMirror({
    initialDoc: value,
    onChange: onEditorChange
  })
  useEffect(() => {
    editorViewRef.current = editorView
  }, [editorView])
  useEffect(() => {
    if (editorView) {
      const editorValue = editorView.state.doc.toString()
      if (value !== editorValue) {
        editorView.dispatch({
          changes: { from: 0, to: editorValue.length, insert: value || '' }
        })
      }
    }
  }, [value, editorView])
  return (
    <div className=" bg-zinc-900 rounded-md overflow-auto fix-border h-full">
      <div className="editor-wrapper" ref={refContainer}></div>
    </div>
  )
}

export default Editor
