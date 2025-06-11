// src/index.ts

import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import path from 'path'
import { WindowManager } from './window-manager'
import { WindowCreateIpc } from './ipcs/window-create.ipc'
import { SharedStateIpc } from './ipcs/shared-state.ipc'
import { IpcFactory } from './ipcs/ipc-factory'

let windowManager: WindowManager

function createWindow(): void {
  const preloadPath = path.join(__dirname, '../preload/index.js')
  windowManager = new WindowManager(preloadPath)
}

function createIPCHandlers(): void {
  new WindowCreateIpc(windowManager)
  IpcFactory.create(SharedStateIpc, true)
}
app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  createWindow()
  createIPCHandlers()

  windowManager.createWindow('/')

  app.on('browser-window-created', (_e, window: BrowserWindow) => {
    optimizer.watchWindowShortcuts(window)
  })

  app.on('activate', () => {
    if (windowManager.getAllWindows().length === 0) {
      windowManager.createWindow('/')
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
