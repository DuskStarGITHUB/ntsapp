/**
 * @name NTS App
 * @description Aplicación de notas NTS con Electron y Vite.
 * @version 1.0.0
 * @created 2025-07-08
 * @updated 2025-08-25
 */

// STATE EXEC
const userApp = 'developer'

// DEPENDENCIES
const { app, BrowserWindow } = require('electron')
const path = require('path')
const VerifyDependencies = require(path.join(
  __dirname,
  'src',
  'core',
  'verifyDependencies'
))
const { initBaseDirs, isInstalled } = require(path.join(
  __dirname,
  'src',
  'core',
  'functions'
))
const RunApp = require(path.join(__dirname, 'src', 'core', 'runApp'))
const { setupIPCHandlers } = require(path.join(
  __dirname,
  'src',
  'core',
  'ipcHandlers'
))

// WINDOW CONFIG
function initWindow() {
  const win = new BrowserWindow({
    title: 'NTS App',
    transparent: true,
    frame: true,
    hasShadow: false,
    alwaysOnTop: false,
    skipTaskbar: true,
    resizable: true,
    vibrancy: 'under-window',
    visualEffectState: 'active',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'src', 'core', 'preload.js')
    }
  })
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, 'dist', 'index.html'))
  } else {
    win.loadURL('http://localhost:5173')
  }
  if (userApp === 'developer') {
    win.webContents.openDevTools({ mode: 'detach' })
  }
  win.setMenu(null)
  win.maximize()
}

// EXEC
app.whenReady().then(() => {
  const dependencyVerifier = new VerifyDependencies()
  dependencyVerifier.run()
  if (!isInstalled()) {
    initBaseDirs()
  }
  const runApp = new RunApp()
  runApp.tryApplyBlur()
  setupIPCHandlers()
  initWindow()
})

// EXIT
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
