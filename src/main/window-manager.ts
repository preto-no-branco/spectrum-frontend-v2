import { BrowserWindow } from 'electron'
import path, { join } from 'path'
import {
  CreateWindowOptions,
  RendererRoutes,
  WindowNode,
  WindowTreeNode
} from 'src/preload/windowManager/interface'
import icon from '../../resources/icon.png?asset'

export class WindowManager {
  private windows: Map<string, WindowNode> = new Map()
  private windowIdCounter = 0

  private generateWindowId(): string {
    return `window_${++this.windowIdCounter}_${Date.now()}`
  }

  public getWindowIdByBrowserWindow(browserWindow: BrowserWindow): string | undefined {
    for (const [id, node] of this.windows) {
      if (node.window === browserWindow) {
        return id
      }
    }
    return undefined
  }

  public createWindow(
    route: RendererRoutes,
    parentId?: string,
    options?: CreateWindowOptions
  ): string {
    const windowId = this.generateWindowId()

    const window = new BrowserWindow({
      width: 900,
      height: 670,
      show: false,
      autoHideMenuBar: true,
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        sandbox: false,
        preload: path.join(__dirname, '../preload/index.js')
      },
      ...options
    })

    const windowNode: WindowNode = {
      id: windowId,
      window,
      route,
      parentId,
      children: new Set()
    }

    this.windows.set(windowId, windowNode)

    if (parentId && this.windows.has(parentId)) {
      const parent = this.windows.get(parentId)!
      parent.children.add(windowId)
    }

    this.setupWindowEventHandlers(windowId, window)

    const formattedRoute = route.startsWith('#') ? route : `#${route}`

    if (process.env.NODE_ENV === 'development') {
      window.loadURL(`http://localhost:5173${formattedRoute}`)
    } else {
      window.loadFile(join(__dirname, '../renderer/index.html'), {
        hash: route.replace('#', '') // loadFile expects hash without #
      })
    }

    window.once('ready-to-show', () => {
      window.show()
    })

    return windowId
  }

  private setupWindowEventHandlers(windowId: string, window: BrowserWindow): void {
    window.on('closed', () => {
      this.cleanupWindow(windowId)
    })

    window.on('close', (event) => {
      event.preventDefault()
      this.closeWindow(windowId)
    })
  }

  public closeWindow(windowId: string): void {
    const windowNode = this.windows.get(windowId)
    if (!windowNode) return

    const childrenToClose = Array.from(windowNode.children)
    childrenToClose.forEach((childId) => {
      this.closeWindow(childId)
    })

    if (windowNode.parentId) {
      const parent = this.windows.get(windowNode.parentId)
      if (parent) {
        parent.children.delete(windowId)
      }
    }

    if (!windowNode.window.isDestroyed()) {
      windowNode.window.removeAllListeners()
      windowNode.window.destroy()
    }

    this.cleanupWindow(windowId)
  }

  private cleanupWindow(windowId: string): void {
    this.windows.delete(windowId)
  }

  public getWindowTree(): WindowTreeNode {
    const tree: WindowTreeNode = {}

    for (const [id, node] of this.windows) {
      tree[id] = {
        id: node.id,
        route: node.route,
        parentId: node.parentId,
        children: node.children
      }
    }

    return tree
  }

  public getRootWindows(): string[] {
    return Array.from(this.windows.values())
      .filter((node) => !node.parentId)
      .map((node) => node.id)
  }

  public getChildWindows(parentId: string): string[] {
    const parent = this.windows.get(parentId)
    return parent ? Array.from(parent.children) : []
  }

  public getNodeByWindowId(windowId: string): WindowNode | undefined {
    return this.windows.get(windowId)
  }
}
