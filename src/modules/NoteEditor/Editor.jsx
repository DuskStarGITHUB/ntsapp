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
        }, 300);
      }
    },
    []
  );
  const [refContainer, editorView] = useCodeMirror({
    initialDoc: value,
    onChange: debouncedOnChange
  })

  useEffect(() => {
    if (editorView) {
      const editorValue = editorView.state.doc.toString();
      if (value !== editorValue) {
        editorView.dispatch({
          changes: { from: 0, to: editorValue.length, insert: value || '' }
        });
      }
    }
  }, [value, editorView]);

  return (
    <div className=" bg-zinc-900 rounded-md overflow-auto fix-border h-full">
      <div className="editor-wrapper" ref={refContainer}></div>
    </div>
  )
}

export default Editor
