import { useEffect, useState, useRef } from 'react'
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { basicSetup } from 'codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
let languages = []
import { oneDark } from '@codemirror/theme-one-dark'

const debounce = (func, delay) => {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
};

export const transparentTheme = EditorView.theme({
  '&': {
    backgroundColor: 'transparent !important',
    height: '100%',
    width: '100%'
    }
})
const loadLanguageData = async () => {
  const module = await import('@codemirror/language-data')
  languages = module.languages
}

const useCodeMirror = props => {
  const refContainer = useRef(null)
  const [editorView, setEditorView] = useState()
  const { onChange, initialDoc } = props
  const ignoreNextExternalUpdate = useRef(false);
  const currentDoc = useRef(initialDoc);
  const debouncedOnChange = useRef(debounce(newDoc => {
    onChange && onChange(newDoc);
  }, 300)).current; // 300ms debounce time

  useEffect(() => {
    if (!refContainer.current) return
    const startState = EditorState.create({
      doc: initialDoc,
      extensions: [
        basicSetup,
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
          addKeymap: true
        }),
        oneDark,
        transparentTheme,
        EditorView.lineWrapping,
        EditorView.updateListener.of(update => {
          if (update.changes) {
            const newDoc = update.state.doc.toString();
            currentDoc.current = newDoc;
            ignoreNextExternalUpdate.current = true;
            debouncedOnChange(newDoc); // Use debounced onChange
          }
        })
      ]
    })
    const view = new EditorView({
      state: startState,
      parent: refContainer.current
    })
    setEditorView(view)
    return () => {
      view.destroy()
    }
  }, [refContainer, onChange])
  useEffect(() => {
    if (editorView) {
      if (ignoreNextExternalUpdate.current) {
        ignoreNextExternalUpdate.current = false;
      } else if (initialDoc !== currentDoc.current) {
        editorView.dispatch({
          changes: {
            from: 0,
            to: editorView.state.doc.length,
            insert: initialDoc || ''
          }
        });
        currentDoc.current = initialDoc;
      }
    }
  }, [initialDoc, editorView])
  return [refContainer, editorView]
}

export default useCodeMirror