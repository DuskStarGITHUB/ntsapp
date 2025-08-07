/**
 * @name NTS App
 * @description Aplicación de notas NTS con Electron y Vite.
 * @version 1.0.0
 * @created 2025-07-08
 * @updated 2025-08-07
 */

// DEPENDENCIES
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const os = require("os");
const { execFile } = require("child_process");
const { baseDir } = require("./src/core/functions");
const VerifyDependencies = require(path.join(
  __dirname,
  "src",
  "core",
  "verifyDependencies"
));
const {
  initBaseDirs,
  listNotes,
  readNote,
  saveNote,
  isInstalled,
} = require(path.join(__dirname, "src", "core", "functions"));

const RunApp = require(path.join(__dirname, "src", "core", "runApp"));


// WINDOW CONFIG
function initWindow() {
  const win = new BrowserWindow({
    title: "NTS App",
    transparent: true,
    frame: true,
    hasShadow: false,
    alwaysOnTop: false,
    skipTaskbar: true,
    resizable: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "src", "core", "preload.js"),
    },
  });
  win.loadURL("http://localhost:5173");
  win.setMenu(null);
  win.maximize();
}

// DELETE NOTE
function deleteNoteWithPython(filePath) {
  return new Promise((resolve) => {
    const scriptPath = path.join(__dirname, "src", "scripts", "deleteNote.py");
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

// EXEC
app.whenReady().then(() => {
  const dependencyVerifier = new VerifyDependencies();
  dependencyVerifier.run();
  if (!isInstalled()) {
    initBaseDirs();
  }
  const runApp = new RunApp();
  runApp.tryApplyBlur();
  initWindow();
});

// IPC HANDLERS
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

// EXIT
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
