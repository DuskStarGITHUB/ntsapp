/**
 * @name ipcHandlers.js
 * @description Functions for Components.
 * @version 1.0.0
 * @created 2025-07-08
 * @updated 2025-08-25
 */

// DEPENDENCIES
const { execSync } = require('child_process')
const os = require('os')

// FUNCTION
class VerifyDependencies {
  isInstalled(command) {
    try {
      execSync(`command -v ${command}`, { stdio: 'ignore' })
      return true
    } catch {
      return false
    }
  }
  installIfMissing(command, packageName) {
    if (!this.isInstalled(command)) {
      console.log(`[DEPENDENCY] Faltante: ${command}, intentando instalar...`)
      const platform = os.platform()
      try {
        if (platform === 'linux') {
          const distro = execSync('cat /etc/os-release').toString()
          if (distro.includes('Arch')) {
            execSync(`sudo pacman -Sy --noconfirm ${packageName}`, {
              stdio: 'inherit'
            })
          } else if (distro.includes('Ubuntu') || distro.includes('Debian')) {
            execSync(`sudo apt update && sudo apt install -y ${packageName}`, {
              stdio: 'inherit'
            })
          } else {
            console.warn(
              `[DEPENDENCY] Distro no soportada: instala manualmente "${packageName}"`
            )
          }
        } else {
          console.warn(
            `[DEPENDENCY] Instalación automática no implementada para esta plataforma (${platform})`
          )
        }
      } catch (error) {
        console.error(
          `[ERROR] Falló la instalación de ${packageName}:`,
          error.message
        )
      }
    } else {
      console.log(`[DEPENDENCY] OK: ${command}`)
    }
  }
  run() {
    console.log('[DEPENDENCY] Verificando dependencias...')
    this.installIfMissing('node', 'nodejs')
    const platform = os.platform()
    if (platform === 'linux') {
      this.installIfMissing('python3', 'python3')
      this.installIfMissing('xdotool', 'xdotool')
      this.installIfMissing('xprop', 'x11-utils')
    }
  }
}

module.exports = VerifyDependencies
