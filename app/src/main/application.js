import { app, BrowserWindow, globalShortcut, ipcMain } from 'electron'
import path from 'path'
import { autoUpdater } from 'electron-updater'

export default class Application {
  constructor () {
    this.winURL = process.env.NODE_ENV === 'development'
      ? `http://localhost:${require('../../../config').port}`
      : `file://${__dirname}/index.html`
    this.mainWindow = undefined
  }

  createWindow () {
    this.mainWindow = new BrowserWindow({
      width: 880,
      height: 488,
      frame: false,
      center: true,
      titleBarStyle: 'customButtonsOnHover',
      webPreferences: {
        webSecurity: false
      }
    })
    console.log('doing.....')
    setTimeout(() => {
      this.mainWindow.loadURL(this.winURL)
    }, 200)

    this.mainWindow.on('closed', () => {
      this.mainWindow = null
    })
  }

  onReady () {
    this.createWindow()
    this.updateHandle()
    // 打开调试的快捷键
    globalShortcut.register('Control+Alt+P', () => {
      this.mainWindow.webContents.openDevTools()
    })
    ipcMain.on('quitApp', () => {
      app.quit()
    })
  }

  registerApplicationCallback () {
    app.on('ready', this.onReady.bind(this))

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })

    app.on('activate', () => {
      if (this.mainWindow === null) {
        this.createWindow()
      }
    })

    var handleStartupEvent = function () {
      if (process.platform !== 'win32') {
        return false
      }
      var squirrelCommand = process.argv[1]
      switch (squirrelCommand) {
        case '--squirrel-install':
        case '--squirrel-updated':
          install()
          return true
        case '--squirrel-uninstall':
          uninstall()
          app.quit()
          return true
        case '--squirrel-obsolete':
          app.quit()
          return true
      }

      function install () {
        var cp = require('child_process')
        var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe')
        var target = path.basename(process.execPath)
        var child = cp.spawn(updateDotExe, [
          '--createShortcut', target
        ], {detached: true})
        child.on('close', function (code) {
          app.quit()
        })
      }
      function uninstall () {
        var cp = require('child_process')
        var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe')
        var target = path.basename(process.execPath)
        var child = cp.spawn(updateDotExe, [
          '--removeShortcut', target
        ], {detached: true})
        child.on('close', function (code) {
          app.quit()
        })
      }
    }

    if (handleStartupEvent()) {
      console.log('fsdfdsaf')
    }
  }

  run () {
    setTimeout(() => {
      this.registerApplicationCallback()
    }, 200)
  }

  updateHandle () { // eslint-disable-line no-unused-vars
    const message = {
      error: '检查更新出错',
      checking: '正在检查更新……',
      updateAva: '检测到新版本，您确定要下载最新版本吗？',
      updateNotAva: '现在使用的就是最新版本,不用更新'
    }
    // 检查更新的地址，部署时更新yml和安装包
    const uploadUrl = 'http://download.chemanman.com/pc_client_pro/win'
    autoUpdater.setFeedURL(uploadUrl)
    autoUpdater.autoDownload = false
    autoUpdater.on('error', () => {
      this.sendUpdateMessage('message', {
        key: 'updateErr',
        msg: message.error
      })
    })

    autoUpdater.on('checking-for-update', () => {
      this.sendUpdateMessage('message', {
        key: 'updateChecking',
        msg: message.checking
      })
    })

    autoUpdater.on('update-available', () => {
      this.sendUpdateMessage('message', {
        key: 'updateAva',
        msg: message.updateAva
      })
    })

    autoUpdater.on('update-not-available', () => {
      this.sendUpdateMessage('message', {
        key: 'updateNotAva',
        msg: message.updateNotAva
      })
    })

    // autoUpdater.on('download-progress', progressObj => {
    //   console.log(progressObj.percent)
    //   this.sendUpdateMessage('downloadProgress', progressObj)
    // })

    autoUpdater.on('update-downloaded', () => {
      ipcMain.on('isUpdateNow', (e, arg) => {
        console.log('开始更新')
        autoUpdater.quitAndInstall()
      })

      this.sendUpdateMessage('isUpdateNow', {})
    })

    ipcMain.on('checkForUpdate', () => {
      autoUpdater.checkForUpdates()
    })

    ipcMain.on('downloadNewApp', () => {
      autoUpdater.downloadUpdate()
    })
  }

  sendUpdateMessage (key, msg) {
    this.mainWindow.webContents.send(key, msg)
  }
}
