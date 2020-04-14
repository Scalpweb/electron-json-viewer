const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");

let win: any = null;
let filePath: string = "";
let started: boolean = false;

function createWindow(target: string = "") {
  if (win === null) {
    win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
      },
    });
  }

  // Load the index.html of the app.
  // win.webContents.openDevTools();
  win.loadURL(
    `file://${path.join(__dirname, "/../dist/index.html")}?target=${target}`
  );
}

app.on("will-finish-launching", () => {
  app.on("open-file", (event, file) => {
    if (started) {
      createWindow(file);
    } else {
      filePath = file;
    }
    event.preventDefault();
  });
});

app.on("ready", () => {
  started = true;
  createWindow(filePath);
});
