import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { CreateWindowOptions, RendererRoutes } from './windowManager/interface'

export type AppRoute =
  | '/'
  | '/analysis'
  | '/analysis/details'
  | '/history'
  | '/settings'
  | '/settings/user'
  | '/settings/access'
  | '/settings/system'
  | '/settings/categories'
  | '/settings/inspection-ways'

export type APIs = {
  sharedStateGetItem: (key: string) => Promise<string | null>
  sharedStateSetItem: (key: string, value: string) => void
  sharedStateUpdated: (callback: (key: string, value: string) => void) => void
  window: {
    create: (route: RendererRoutes, options?: Partial<CreateWindowOptions>) => void
    close: () => void
    getTree: () => unknown
  }
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

// Custom APIs for renderer
const api = {
  sharedStateGetItem: (key: string) => ipcRenderer.invoke('shared-state-get-item', key),
  sharedStateSetItem: (key: string, value: string) => {
    console.log('kKEYYYYYYYY: ', key)
    ipcRenderer.send('shared-state-set-item', key, value)
  },
  sharedStateUpdated: (callback: (key: string, value: string) => void) => {
    ipcRenderer.on('shared-state-updated', (_, key, value) => {
      callback(key, value)
    })
  },
  window: {
    create: (route: RendererRoutes, options?: Partial<CreateWindowOptions>) =>
      ipcRenderer.send('create-window', route, options),
    close: () => ipcRenderer.send('close-window'),
    getTree: () => ipcRenderer.invoke('get-window-tree')
  },
  socket: {
    connect: (baseURL?: string) => ipcRenderer.invoke('socket-connect', baseURL),
    disconnect: () => ipcRenderer.send('socket-disconnect'),
    login: (token: string) => ipcRenderer.send('socket-login', token),
    sendPlay: () => ipcRenderer.send('socket-send-play'),
    sendPause: () => ipcRenderer.send('socket-send-pause'),

    getConnected: () => ipcRenderer.invoke('socket-get-connected'),
    getPlayPause: () => ipcRenderer.invoke('socket-get-playpause'),
    getLastInspection: () => ipcRenderer.invoke('socket-get-last-inspection'),

    onConnected: (callback: () => void) => ipcRenderer.on('socket-connected', () => callback()),
    onDisconnected: (callback: (reason: string) => void) =>
      ipcRenderer.on('socket-disconnected', (_, data) => callback(data.reason)),
    onPlay: (callback: () => void) => ipcRenderer.on('socket-play', () => callback()),
    onPause: (callback: () => void) => ipcRenderer.on('socket-pause', () => callback()),
    onInspection: (callback: (data: unknown) => void) =>
      ipcRenderer.on('socket-inspection', (_, data) => callback(data)),
    onLogout: (callback: () => void) => ipcRenderer.on('socket-logout', () => callback())
  }
} as const satisfies APIs

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
