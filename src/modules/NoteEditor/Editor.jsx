import React, { useCallback, useRef, useEffect } from 'react'
import useCodeMirror from '../../lib/use-codemirror'
import "../../styles/editor.css"

const Editor = ({ value, onChange }) => {
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const debouncedOnChange = useCallback(
    (doc) => {
      const handler = onChangeRef.current;
      if (handler) {
        clearTimeout(debouncedOnChange.timeout);
        debouncedOnChange.timeout = setTimeout(() => {
          handler(doc);
        }, 300); // Debounce for 300ms
      }
    },
    []
  );

  const [refContainer] = useCodeMirror({
    initialDoc: value,
    onChange: debouncedOnChange
  })
  return (
    <div className="flex bg-zinc-900 rounded-md overflow-hidden fix-border h-full">
      <div className="editor-wrapper" ref={refContainer}></div>
    </div>
  )
}

export default Editor
