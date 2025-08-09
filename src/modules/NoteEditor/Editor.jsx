import React, { useEffect } from 'react'
import useCodeMirror from '../../lib/use-codemirror'

const Editor = ({ value, onChange }) => {
  const [refContainer, editorView] = useCodeMirror({
    initialDoc: value,
    onChange: doc => onChange(doc)
  })

  useEffect(() => {
    if (editorView) {
      if (value !== editorView.state.doc.toString()) {
        editorView.dispatch({
          changes: {
            from: 0,
            to: editorView.state.doc.length,
            insert: value || ''
          }
        })
      }
    }
  }, [value, editorView])

  return (
    <div className="flex bg-zinc-900 rounded-md overflow-hidden fix-border h-full">
      <div className="editor-wrapper" ref={refContainer}></div>
    </div>
  )
}

export default Editor
