import { BrowserWindowConstructorOptions } from 'electron/utility'
import { AppRoute } from '..'
export interface WindowNode {
  id: string
  window: Electron.BrowserWindow
  route: AppRoute
  parentId?: string
  children: Set<string>
}

export type WindowTreeNode = Record<string, Omit<WindowNode, 'window'>>

export interface WindowManagerAPI {
  createWindow: (route: AppRoute, parentId?: string) => Promise<string>
  closeWindow: (windowId: string) => void
  getWindowTree: () => Record<string, WindowNode>
}

export type RendererRoutes = AppRoute

export type CreateWindowOptions = BrowserWindowConstructorOptions
