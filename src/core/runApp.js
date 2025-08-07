/**
 * @file runApp.js
 * @description Contains the core application logic for the main process.
 */

// DEPENDENCIES
const { execSync, spawn } = require("child_process");
const os = require("os");
const path = require("path");

// FUNCTION
class RunApp {
  isKWinRunning() {
    try {
      const result = execSync("pgrep -f kwin_x11 || true").toString().trim();
      return result !== "";
    } catch {
      return false;
    }
  }
  // APPLY BLUR OUR CONFIGURATIONS FOR WINDOWS
  tryApplyBlur() {
    const platform = os.platform();
    const desktop = process.env.XDG_CURRENT_DESKTOP || "";
    const kdeSession = process.env.KDE_FULL_SESSION === "true";
    // LINUX
    if (platform === "linux" && desktop.toLowerCase().includes("kde")) {
      // KWIN
      if (kdeSession || this.isKWinRunning()) {
        const scriptPath = path.join(__dirname, "..", "scripts", "blurKwin.py");
        const py = spawn("python3", [scriptPath]);
        py.stdout.on("data", (data) => console.log(data.toString()));
        py.stderr.on("data", (data) => console.error(data.toString()));
      }
    }
  }
}

module.exports = RunApp;
