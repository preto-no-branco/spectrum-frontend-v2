import { ipcMain, BrowserWindow } from 'electron'
import { BaseIpcService } from './ipc-factory'

export class SharedStateIpc implements BaseIpcService {
  private state: Record<string, string> = {}
  debug: boolean

  constructor(debug: boolean = false) {
    this.debug = debug
    if (this.debug) {
      console.log('[SharedStateIpc] Inicializado com debug =', this.debug)
    }
  }

  registerIpcListeners(): void {
    ipcMain.on('shared-state-set-item', (_, key: string, value: string) => {
      if (this.debug) {
        console.log(`[SharedStateIpc] IPC set-item recebido: chave = "${key}", valor = "${value}"`)
      }
      this.setItem(key, value)
    })
  }

  registerIpcHandlers(): void {
    ipcMain.handle('shared-state-get-item', (_, key: string) => {
      if (this.debug) {
        console.log(`[SharedStateIpc] IPC get-item chamado para chave: "${key}"`)
      }
      return this.getItem(key)
    })
  }

  public getItem(key: string): string | null {
    if (!(key in this.state)) {
      if (this.debug) {
        console.log(`[SharedStateIpc] getItem: chave "${key}" não existe → retorna null`)
      }
      return null
    }
    const found = this.state[key]
    if (this.debug) {
      console.log(`[SharedStateIpc] getItem: chave "${key}" → valor atual = "${found}"`)
    }
    return found
  }

  public setItem(key: string, value: string): void {
    const previous = this.state[key]
    this.state[key] = value

    if (this.debug) {
      console.log(
        `[SharedStateIpc] setItem: chave "${key}", valor definido = "${value}", valor anterior = "${previous}"`
      )
    }

    if (previous !== value) {
      this.notifyAllWindows(key)
    } else if (this.debug) {
      console.log(`[SharedStateIpc] setItem: valor não mudou, sem notificação para "${key}"`)
    }
  }

  private notifyAllWindows(key: string): void {
    const newValue = this.state[key]
    if (this.debug) {
      console.log(
        `[SharedStateIpc] notifyAllWindows: notificando para chave "${key}" → "${newValue}"`
      )
    }
    BrowserWindow.getAllWindows().forEach((win) => {
      win.webContents.send('shared-state-updated', key, newValue)
      if (this.debug) {
        console.log(
          `[SharedStateIpc] enviado "shared-state-updated" para window id=${win.id}: chave="${key}", valor="${newValue}"`
        )
      }
    })
  }
}
