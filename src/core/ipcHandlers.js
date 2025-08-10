/**
 * @name ipcHandlers.js
 * @description Functions for Components.
 * @version 1.0.0
 * @created 2025-07-08
 * @updated 2025-08-25
 */

// DEPENDENCIES
const { ipcMain } = require('electron')
const { execFile } = require('child_process')
const path = require('path')
const { baseDir, listNotes, readNote, saveNote } = require('./functions')

// FUNCTIONS
function deleteNoteWithPython(filePath) {
  return new Promise(resolve => {
    const scriptPath = path.join(__dirname, '..', 'scripts', 'deleteNote.py')
    execFile('python3', [scriptPath, filePath], (error, stdout, stderr) => {
      if (error) {
        console.error('Error deleting note:', error)
        resolve({ success: false, error: error.message })
        return
      }
      resolve({ success: true, output: stdout.trim() })
    })
  })
}

function renameNoteWithPython(oldPath, newName) {
  console.log(`Intentando renombrar: ${oldPath} -> ${newName}`)
  return new Promise(resolve => {
    const scriptPath = path.join(__dirname, '..', 'scripts', 'renameNote.py')
    execFile(
      'python3',
      [scriptPath, oldPath, newName],
      (error, stdout, stderr) => {
        if (stderr) {
          console.error('stderr:', stderr.toString())
        }
        let parsed = null
        try {
          parsed = JSON.parse(stdout)
        } catch (e) {
          console.error(
            'No se pudo parsear JSON desde renameNote.py:',
            e,
            'stdout:',
            stdout
          )
        }
        if (error) {
          console.error('Error de ejecución del script:', error)
          const errMsg = parsed && parsed.error ? parsed.error : error.message
          resolve({ success: false, error: errMsg })
          return
        }
        if (parsed && parsed.success) {
          resolve({
            success: true,
            oldPath: parsed.old,
            newPath: parsed.new,
            raw: stdout.trim()
          })
        } else {
          resolve({
            success: false,
            error: parsed ? parsed.error : 'Unknown error',
            raw: stdout.trim()
          })
        }
      }
    )
  })
}

function setupIPCHandlers() {
  ipcMain.handle('list-notes', () => {
    return listNotes()
  })
  ipcMain.handle('read-note', (event, filePath) => {
    return readNote(filePath)
  })
  ipcMain.handle('save-note', (event, filePath, content) => {
    saveNote(filePath, content)
    return true
  })
  ipcMain.handle('get-base-dir', () => {
    return baseDir
  })
  ipcMain.handle('delete-note', (event, filePath) => {
    return deleteNoteWithPython(filePath)
  })
  ipcMain.handle('rename-note', (event, oldPath, newName) => {
    return renameNoteWithPython(oldPath, newName)
  })
  ipcMain.on('log-message', (event, message) => {
    console.log('[FRONTEND LOG]:', message)
  })
}

module.exports = { setupIPCHandlers }
