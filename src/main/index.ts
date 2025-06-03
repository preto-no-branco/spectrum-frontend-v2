import { app } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { join } from 'path'
import { WindowManager } from './window-manager'
import { WindowCreateIpc } from './ipcs/window-create.ipc'
import { SharedStateIpc } from './ipcs/shared-state.ipc'
import { IpcFactory } from './ipcs/ipc-factory'

let windowManager: WindowManager

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  const preloadPath = join(__dirname, '../preload/index.js')
  windowManager = new WindowManager(preloadPath)

  createIPCHandlers()

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  app.on('activate', () => {
    if (windowManager.getAllWindows().length === 0) {
      windowManager.createWindow('/')
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

function createIPCHandlers(): void {
  new WindowCreateIpc(windowManager)
  IpcFactory.create(SharedStateIpc, true)
}
