import { BrowserWindow, shell } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

type WindowInfo = {
  id: number
  order: number
  route: string
  window: BrowserWindow
}

export class WindowManager {
  private windows: WindowInfo[] = []
  private windowOrder = 0

  constructor(private preloadPath: string) {}

  public createWindow(initialRoute = '/'): BrowserWindow {
    console.log('[WindowManager] Creating window with initial route:', initialRoute)

    const win = new BrowserWindow({
      width: 1440,
      height: 900,
      show: false,
      autoHideMenuBar: true,
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        preload: this.preloadPath,
        sandbox: false
      }
    })

    const order = this.windowOrder++
    const cleanedRoute = initialRoute.replace(/^\//, '') // remove leading slash

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      // In development, load from dev server, using hash-based routing
      win.loadURL(`${process.env['ELECTRON_RENDERER_URL']}#/${cleanedRoute}`)
    } else {
      // In production, load the local index.html with a hash fragment
      win.loadFile(join(__dirname, '../renderer/index.html'), {
        hash: cleanedRoute
      })
    }

    win.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })

    win.on('ready-to-show', () => win.show())

    win.on('closed', () => {
      this.windows = this.windows.filter((w) => w.window !== win)
    })

    this.windows.push({
      id: win.id,
      order,
      route: initialRoute,
      window: win
    })

    return win
  }

  public getAllWindows(): WindowInfo[] {
    return this.windows
  }

  public getWindowById(id: number): WindowInfo | undefined {
    return this.windows.find((w) => w.id === id)
  }

  public duplicateWindow(sourceId: number): BrowserWindow | undefined {
    const original = this.getWindowById(sourceId)
    if (!original) return undefined
    return this.createWindow(original.route)
  }
}
