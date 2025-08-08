import React, { useEffect } from 'react'
import useCodeMirror from '../../lib/use-codemirror'

const Editor = ({ value, onChange }) => {
  const [refContainer] = useCodeMirror({
    initialDoc: value,
    onChange: doc => onChange(doc)
  })
  return (
    <div className="flex bg-zinc-900 rounded-md overflow-hidden fix-border h-full">
      <div className="editor-wrapper" ref={refContainer}></div>
    </div>
  )
}

export default Editor
