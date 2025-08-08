const { ipcMain } = require("electron");
const { execFile } = require("child_process");
const path = require("path");
const { baseDir, listNotes, readNote, saveNote } = require("./functions");

function deleteNoteWithPython(filePath) {
  return new Promise((resolve) => {
    const scriptPath = path.join(__dirname, "..", "scripts", "deleteNote.py");
    execFile("python3", [scriptPath, filePath], (error, stdout, stderr) => {
      if (error) {
        console.error("Error deleting note:", error);
        resolve({ success: false, error: error.message });
        return;
      }
      resolve({ success: true, output: stdout.trim() });
    });
  });
}

function renameNoteWithPython(oldPath, newName) {
  console.log(`Intentando renombrar: ${oldPath} -> ${newName}`); // LOG 1
  return new Promise((resolve) => {
    const scriptPath = path.join(__dirname, "..", "scripts", "renameNote.py");
    execFile("python3", [scriptPath, oldPath, newName], (error, stdout, stderr) => {
      console.log("Salida del script:", stdout); // LOG 2
      console.error("Error del script:", stderr); // LOG 3
      if (error) {
        console.error("Error de ejecución del script:", error); // LOG 4
        resolve({ success: false, error: error.message });
        return;
      }
      resolve({ success: true, output: stdout.trim() });
    });
  });
}

function setupIPCHandlers() {
  ipcMain.handle("list-notes", () => {
    return listNotes();
  });
  ipcMain.handle("read-note", (event, filePath) => {
    return readNote(filePath);
  });
  ipcMain.handle("save-note", (event, filePath, content) => {
    saveNote(filePath, content);
    return true;
  });
  ipcMain.handle("get-base-dir", () => {
    return baseDir;
  });
  ipcMain.handle("delete-note", (event, filePath) => {
    return deleteNoteWithPython(filePath);
  });
  ipcMain.handle("rename-note", (event, oldPath, newName) => {
    return renameNoteWithPython(oldPath, newName);
  });

  ipcMain.on("log-message", (event, message) => {
    console.log("[FRONTEND LOG]:", message);
  });
}

module.exports = { setupIPCHandlers };
