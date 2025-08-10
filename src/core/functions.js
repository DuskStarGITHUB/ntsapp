/**
 * @name functions.js
 * @description Functions for Components.
 * @version 1.0.0
 * @created 2025-07-08
 * @updated 2025-08-25
 */

// DEPENDENCIES
const fs = require('fs')
const path = require('path')
const os = require('os')
const baseDir = path.join(os.homedir(), '.ntsapp')
const configDir = path.join(baseDir, 'config')
const notesDir = path.join(baseDir, 'notes')
const installationDir = path.join(baseDir, 'installation')

// FUNCTIONS
function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

function initBaseDirs() {
  ensureDirExists(baseDir)
  ensureDirExists(configDir)
  ensureDirExists(notesDir)
  ensureDirExists(installationDir)
}

function listNotes() {
  if (!fs.existsSync(notesDir)) return []
  return fs
    .readdirSync(notesDir)
    .filter(file => file.endsWith('.md'))
    .map(file => ({
      name: file,
      path: path.join(notesDir, file)
    }))
}

function readNote(filePath) {
  if (!fs.existsSync(filePath)) return ''
  return fs.readFileSync(filePath, 'utf-8')
}

function saveNote(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf-8')
}

function isInstalled() {
  return fs.existsSync(baseDir) && fs.existsSync(notesDir)
}

module.exports = {
  baseDir,
  configDir,
  notesDir,
  installationDir,
  initBaseDirs,
  listNotes,
  readNote,
  saveNote,
  isInstalled
}
