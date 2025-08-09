import React, { useCallback } from 'react'
import useCodeMirror from '../../lib/use-codemirror'
import "../../styles/editor.css"

const Editor = ({ value, onChange }) => {
  const memoizedOnChange = useCallback(
    doc => onChange(doc),
    [onChange]
  );
  const [refContainer] = useCodeMirror({
    initialDoc: value,
    onChange: memoizedOnChange
  })
  return (
    <div className="flex bg-zinc-900 rounded-md overflow-hidden fix-border h-full">
      <div className="editor-wrapper" ref={refContainer}></div>
    </div>
  )
}

export default Editor
