const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  listNotes: () => ipcRenderer.invoke("list-notes"),
  readNote: (filePath) => ipcRenderer.invoke("read-note", filePath),
  saveNote: (filePath, content) =>
    ipcRenderer.invoke("save-note", filePath, content),
  getBaseDir: () => ipcRenderer.invoke("get-base-dir"),
  deleteNote: (filePath) => ipcRenderer.invoke("delete-note", filePath),
});
