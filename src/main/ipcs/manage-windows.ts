import { BrowserWindow, ipcMain } from 'electron/main'
import { WindowManager } from '../window-manager'
import { BaseIpcService } from './ipc-factory'
import { IpcMainInvokeEvent } from 'electron/utility'
import {
  CreateWindowOptions,
  RendererRoutes,
  WindowTreeNode
} from 'src/preload/windowManager/interface'

export class ManageWindowIPC implements BaseIpcService {
  debug: boolean
  windowManager: WindowManager

  constructor(debug: boolean = false, windowManager: WindowManager) {
    this.debug = debug
    this.windowManager = windowManager
  }

  public registerIpcListeners(): void {
    if (this.debug) {
      console.log('[ManageWindowIPC] Registering IPC listeners...')
    }

    if (this.debug) {
      console.log('[ManageWindowIPC] IPC listeners registered successfully')
    }
  }

  public registerIpcHandlers(): void {
    if (this.debug) {
      console.log('[ManageWindowIPC] Registering IPC handlers...')
    }

    ipcMain.handle('create-window', this.handleCreateWindow.bind(this))

    ipcMain.handle('close-window', this.handleCloseWindow.bind(this))

    ipcMain.handle('get-window-tree', this.handleGetWindowTree.bind(this))

    if (this.debug) {
      console.log('[ManageWindowIPC] IPC handlers registered successfully')
    }
  }

  private async handleCreateWindow(
    event: IpcMainInvokeEvent,
    route: RendererRoutes,
    options?: Partial<CreateWindowOptions>
  ): Promise<string> {
    try {
      if (this.debug) {
        console.log('[ManageWindowIPC] Creating window:', { route, options })
      }

      const senderWindow = BrowserWindow.fromWebContents(event.sender)
      const parentId = senderWindow
        ? this.windowManager.getWindowIdByBrowserWindow(senderWindow)
        : undefined

      const windowId = this.windowManager.createWindow(route, parentId, {
        width: options?.width,
        height: options?.height,
        x: options?.x,
        y: options?.y
      })

      if (this.debug) {
        console.log('[ManageWindowIPC] Window created successfully:', windowId)
      }

      return windowId
    } catch (error) {
      if (this.debug) {
        console.error('[ManageWindowIPC] Error creating window:', error)
      }
      throw error
    }
  }

  private async handleCloseWindow(event: IpcMainInvokeEvent): Promise<void> {
    try {
      const senderWindow = BrowserWindow.fromWebContents(event.sender)
      const windowId = senderWindow
        ? this.windowManager.getWindowIdByBrowserWindow(senderWindow)
        : undefined

      if (this.debug) {
        console.log('[ManageWindowIPC] Closing window:', windowId)
      }

      if (!windowId) {
        return
      }

      this.windowManager.closeWindow(windowId)

      if (this.debug) {
        console.log('[ManageWindowIPC] Window closed successfully:', windowId)
      }
    } catch (error) {
      if (this.debug) {
        console.error('[ManageWindowIPC] Error closing window:', error)
      }
      throw error
    }
  }

  private async handleGetWindowTree(): Promise<WindowTreeNode> {
    try {
      if (this.debug) {
        console.log('[ManageWindowIPC] Getting window tree')
      }

      const tree = this.windowManager.getWindowTree()

      // Convert Set to Array for JSON serialization
      const serializedTree: WindowTreeNode = {}

      Object.entries(tree).forEach(([id, node]) => {
        serializedTree[id] = {
          id: node.id,
          route: node.route,
          parentId: node.parentId,
          children: node.children
        }
      })

      return serializedTree
    } catch (error) {
      if (this.debug) {
        console.error('[ManageWindowIPC] Error getting window tree:', error)
      }
      throw error
    }
  }

  public setDebug(enabled: boolean): void {
    this.debug = enabled
    if (this.debug) {
      console.log('[ManageWindowIPC] Debug mode:', enabled ? 'enabled' : 'disabled')
    }
  }

  public cleanup(): void {
    if (this.debug) {
      console.log('[ManageWindowIPC] Cleaning up IPC handlers and listeners...')
    }

    // Remove all handlers
    ipcMain.removeHandler('create-window')
    ipcMain.removeHandler('close-window')
    ipcMain.removeHandler('get-window-tree')
    ipcMain.removeHandler('get-window-info')
    ipcMain.removeHandler('get-all-windows')
    ipcMain.removeHandler('focus-window')
    ipcMain.removeHandler('get-parent-window')
    ipcMain.removeHandler('get-child-windows')
    ipcMain.removeHandler('window-exists')

    // Remove all listeners
    ipcMain.removeAllListeners('window-focus')
    ipcMain.removeAllListeners('window-minimize')
    ipcMain.removeAllListeners('window-maximize')
    ipcMain.removeAllListeners('window-restore')
    ipcMain.removeAllListeners('window-ready')

    if (this.debug) {
      console.log('[ManageWindowIPC] Cleanup completed')
    }
  }
}
