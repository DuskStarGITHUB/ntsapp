/**
 * @name NTS App
 * @description Aplicación de notas NTS con Electron y Vite.
 * @version 1.0.0
 * @created 2025-07-08
 * @updated 2025-08-07
 */

// DEPENDENCIES
const { app, BrowserWindow } = require("electron");
const path = require("path");
const VerifyDependencies = require(path.join(
  __dirname,
  "src",
  "core",
  "verifyDependencies"
));
const { initBaseDirs, isInstalled } = require(path.join(
  __dirname,
  "src",
  "core",
  "functions"
));
const RunApp = require(path.join(__dirname, "src", "core", "runApp"));
const { setupIPCHandlers } = require(path.join(
  __dirname,
  "src",
  "core",
  "ipcHandlers"
));

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

// EXEC
app.whenReady().then(() => {
  const dependencyVerifier = new VerifyDependencies();
  dependencyVerifier.run();
  if (!isInstalled()) {
    initBaseDirs();
  }
  const runApp = new RunApp();
  runApp.tryApplyBlur();
  setupIPCHandlers();
  initWindow();
});

// EXIT
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
