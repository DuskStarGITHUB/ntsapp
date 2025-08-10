/**
 * @name perload.js
 * @description Functions for Components.
 * @version 1.0.0
 * @created 2025-07-08
 * @updated 2025-08-25
 */

// DEPENDENCIES
const { contextBridge, ipcRenderer } = require('electron')

// FUNCTION
contextBridge.exposeInMainWorld('electronAPI', {
  listNotes: () => ipcRenderer.invoke('list-notes'),
  readNote: filePath => ipcRenderer.invoke('read-note', filePath),
  saveNote: (filePath, content) =>
    ipcRenderer.invoke('save-note', filePath, content),
  getBaseDir: () => ipcRenderer.invoke('get-base-dir'),
  deleteNote: filePath => ipcRenderer.invoke('delete-note', filePath),
  renameNote: (oldPath, newName) =>
    ipcRenderer.invoke('rename-note', oldPath, newName),
  log: message => ipcRenderer.send('log-message', message)
})
