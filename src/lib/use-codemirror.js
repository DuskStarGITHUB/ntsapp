/**
 * @name use-codemirror.js
 * @description Librery Functions for Editor Component.
 * @version 1.0.0
 * @created 2025-07-08
 * @updated 2025-08-25
 */

// DEPENDENCIES
import { useEffect, useState, useRef } from 'react'
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { basicSetup } from 'codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'
let languages = []

// FUNCTIONS
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
          if (update.docChanged) {
            onChange && onChange()
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
  return [refContainer, editorView]
}

export default useCodeMirror
