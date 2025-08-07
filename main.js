/**
 * @name NTS App
 * @description Aplicación de notas NTS con Electron y Vite.
 * @version 1.0.0
 * @see [Documentación](https://github.com/DuskStarGITHUB/ntsapp.git)
 * @created 2025-07-08
 * @updated 2025-07-07
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
const RunApp = require(path.join(__dirname, "src", "core", "runApp"));

// WINDOWS CONFIG
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
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadURL("http://localhost:5173");
  win.setMenu(null);
  win.maximize();
}

// EXEC
app.whenReady().then(() => {
  const dependencyVerifier = new VerifyDependencies();
  const runApp = new RunApp();
  dependencyVerifier.run();
  initWindow();
  runApp.tryApplyBlur();
});