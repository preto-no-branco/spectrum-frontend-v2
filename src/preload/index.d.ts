import { ElectronAPI } from '@electron-toolkit/preload'
import type { APIs } from './index'

declare global {
  interface Routes {
    routes: AppRoute
  }

  interface Window {
    electron: ElectronAPI
    api: APIs
  }
}
