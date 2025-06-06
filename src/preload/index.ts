import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  createWindow: (route: string) => ipcRenderer.invoke('create-window', route),
  sharedStateGetItem: (key: string) => ipcRenderer.invoke('shared-state-get-item', key),
  sharedStateSetItem: (key: string, value: string) =>
    ipcRenderer.send('shared-state-set-item', key, value),
  sharedStateUpdated: (callback: (key: string, value: string) => void) => {
    ipcRenderer.on('shared-state-updated', (_, key, value) => {
      callback(key, value)
    })
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
  },
  runCimp: (effect: string) => ipcRenderer.invoke('run-cimp', effect)
}

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
