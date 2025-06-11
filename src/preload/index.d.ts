import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      createWindow: (route: string) => Promise<void>
      sharedStateGetItem: (key: string) => Promise<string | null>
      sharedStateSetItem: (key: string, value: string) => void
      sharedStateUpdated: (callback: (key: string, value: string) => void) => void
      runCimp: (effect: string) => Promise<{ success: boolean; data?: string; error?: string }>
      socket: {
        connect: (baseURL?: string) => Promise<void>
        disconnect: () => void
        login: (token: string) => void
        sendPlay: () => void
        sendPause: () => void
        getConnected: () => Promise<boolean>
        getPlayPause: () => Promise<'playing' | 'paused' | null>
        getLastInspection: () => Promise<unknown>
        onConnected: (callback: () => void) => void
        onDisconnected: (callback: (reason: string) => void) => void
        onPlay: (callback: () => void) => void
        onPause: (callback: () => void) => void
        onInspection: (callback: (data: unknown) => void) => void
        onLogout: (callback: () => void) => void
      }
    }
  }
}
