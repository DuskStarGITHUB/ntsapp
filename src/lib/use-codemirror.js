import { useEffect, useState, useRef } from 'react'
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { basicSetup } from 'codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
let languages = []
import { oneDark } from '@codemirror/theme-one-dark'

export const transparentTheme = EditorView.theme({
  '&': {
    backgroundColor: 'transparent !important',
    height: '100%'
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
  const isUpdatingInternally = useRef(false);

  // Effect for initializing the editor
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
            if (newDoc !== initialDoc) {
              isUpdatingInternally.current = true;
              onChange && onChange(newDoc);
            }
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

  // Effect for updating the editor content when initialDoc changes
  useEffect(() => {
    if (editorView && !isUpdatingInternally.current && initialDoc !== editorView.state.doc.toString()) {
      editorView.dispatch({
        changes: {
          from: 0,
          to: editorView.state.doc.length,
          insert: initialDoc || ''
        }
      })
    }
    isUpdatingInternally.current = false;
  }, [initialDoc, editorView])

  return [refContainer, editorView]
}

export default useCodeMirror