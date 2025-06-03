import { ipcMain } from 'electron'
import type { WindowManager } from '../window-manager'

export class WindowCreateIpc {
  constructor(private windowManager: WindowManager) {
    this.registerIpcHandlers()
  }

  private registerIpcHandlers(): void {
    ipcMain.handle('create-window', async (_, route: string) => {
      this.createWindow(route)
    })
  }

  private createWindow(route: string): void {
    const safeRoute = typeof route === 'string' && route.trim() ? route : '/'
    this.windowManager.createWindow(safeRoute)
  }
}
