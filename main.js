const { app, BrowserWindow } = require('electron')
const { join } = require('path')
const { format } = require('url')

let win

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 600,
    height: 400,
    backgroundColor: '#ffffff',
    icon: format({
      pathname: join(__dirname, '/docs/assets/icons/icon-192x192.png'),
      protocol: 'file:',
      slashes: true
    })
  })

  win.loadURL(
    format({
      pathname: join(__dirname, '/docs/dist.html'),
      protocol: 'file:',
      slashes: true
    })
  )

  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})
