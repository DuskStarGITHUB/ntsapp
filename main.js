// DEPENDENCIES
const { app, BrowserWindow } = require("electron");
const { spawn, execSync } = require("child_process");
const os = require("os");
const path = require("path");
const { VerifyDependencies } = require(path.join(
  __dirname,
  "src",
  "core",
  "verifyDependencies"
));

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

function isKWinRunning() {
  try {
    const result = execSync("pgrep -f kwin_x11 || true").toString().trim();
    return result !== "";
  } catch {
    return false;
  }
}

function tryApplyBlur() {
  const platform = os.platform();
  const desktop = process.env.XDG_CURRENT_DESKTOP || "";
  const kdeSession = process.env.KDE_FULL_SESSION === "true";
  if (platform === "linux" && desktop.toLowerCase().includes("kde")) {
    if (kdeSession || isKWinRunning()) {
      const py = spawn("python3", ["src/scripts/aplicar_blur.py"]);
      py.stdout.on("data", (data) => console.log(data.toString()));
      py.stderr.on("data", (data) => console.error(data.toString()));
    }
  }
}

app.whenReady().then(() => {
  VerifyDependencies();
  initWindow();
  tryApplyBlur();
});
