// src/index.ts

import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { WindowManager } from './window-manager'
import { SharedStateIpc } from './ipcs/shared-state.ipc'
import { IpcFactory } from './ipcs/ipc-factory'
import { ManageWindowIPC } from './ipcs/manage-windows'

const windowManager: WindowManager = new WindowManager()

function createIPCHandlers(): void {
  IpcFactory.create(ManageWindowIPC, true, windowManager)
  IpcFactory.create(SharedStateIpc, true)
}
app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  windowManager.createWindow('/login')

  createIPCHandlers()

  app.on('browser-window-created', (_e, window: BrowserWindow) => {
    optimizer.watchWindowShortcuts(window)
  })

  app.on('activate', () => {
    if (windowManager.getRootWindows().length === 0) {
      windowManager.createWindow('/login')
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
