import { ipcMain, BrowserWindow } from 'electron'
import io from 'socket.io-client'
import { BaseIpcService } from './ipc-factory'

export interface SocketConfig {
  url?: string
  options?: {
    reconnection?: boolean
    reconnectionDelay?: number
    reconnectionDelayMax?: number
    maxReconnectionAttempts?: number
    timeout?: number
    forceNew?: boolean
  }
}

export class SocketIpc implements BaseIpcService {
  private socket: SocketIOClient.Socket | null = null
  private config: SocketConfig
  private isConnecting: boolean = false
  private reconnectAttempts: number = 0
  private maxReconnectAttempts: number = 5
  private reconnectDelay: number = 1000
  private token: string | null = null
  debug: boolean

  constructor(config: SocketConfig, debug: boolean = false) {
    this.config = config
    this.debug = debug
    this.maxReconnectAttempts = config.options?.maxReconnectionAttempts || 5
    this.reconnectDelay = config.options?.reconnectionDelay || 1000

    if (this.debug) {
      console.log('[SocketIpc] Inicializado com debug =', this.debug)
      console.log('[SocketIpc] Configuração:', this.config)
    }
  }

  registerIpcListeners(): void {
    // Listener para conectar ao socket
    ipcMain.on('socket-connect', () => {
      if (this.debug) {
        console.log('[SocketIpc] IPC socket-connect recebido')
      }
      this.connect()
    })

    // Listener para desconectar do socket
    ipcMain.on('socket-disconnect', () => {
      if (this.debug) {
        console.log('[SocketIpc] IPC socket-disconnect recebido')
      }
      this.disconnect()
    })

    // Listener para enviar eventos através do socket
    ipcMain.on('socket-emit', (_, eventName: string, data?: unknown) => {
      if (this.debug) {
        console.log(`[SocketIpc] IPC socket-emit recebido: evento = "${eventName}", dados =`, data)
      }
      this.emit(eventName, data)
    })

    // Listener para se inscrever em eventos do socket
    ipcMain.on('socket-subscribe', (_, eventName: string) => {
      if (this.debug) {
        console.log(`[SocketIpc] IPC socket-subscribe recebido: evento = "${eventName}"`)
      }
      this.subscribeToEvent(eventName)
    })

    // Listener para cancelar inscrição em eventos do socket
    ipcMain.on('socket-unsubscribe', (_, eventName: string) => {
      if (this.debug) {
        console.log(`[SocketIpc] IPC socket-unsubscribe recebido: evento = "${eventName}"`)
      }
      this.unsubscribeFromEvent(eventName)
    })
  }

  registerIpcHandlers(): void {
    // Handler para obter status da conexão
    ipcMain.handle('socket-get-connection-status', () => {
      const status = {
        connected: this.socket?.connected || false,
        connecting: this.isConnecting,
        reconnectAttempts: this.reconnectAttempts,
        socketId: this.socket?.id || null
      }

      if (this.debug) {
        console.log('[SocketIpc] IPC socket-get-connection-status chamado:', status)
      }

      return status
    })

    // Handler para obter configuração atual
    ipcMain.handle('socket-get-config', () => {
      if (this.debug) {
        console.log('[SocketIpc] IPC socket-get-config chamado')
      }
      return this.config
    })
  }

  public connect(): void {
    if (this.socket?.connected) {
      if (this.debug) {
        console.log('[SocketIpc] Já conectado ao socket')
      }
      return
    }

    if (!this.config.url) {
      if (this.debug) {
        console.log(`[SocketIpc] Conectando ao socket em ${this.config.url}`)
      }

      return
    }

    if (this.isConnecting) {
      if (this.debug) {
        console.log('[SocketIpc] Conexão já em andamento')
      }
      return
    }

    this.isConnecting = true

    if (this.debug) {
      console.log(`[SocketIpc] Iniciando conexão com ${this.config.url}`)
    }

    // Criar nova instância do socket
    this.socket = io(this.config.url, {
      reconnection: false,
      timeout: this.config.options?.timeout || 5000,
      forceNew: this.config.options?.forceNew || false,
      ...this.config.options
    })

    this.setupSocketListeners()
  }

  public disconnect(): void {
    if (this.debug) {
      console.log('[SocketIpc] Desconectando do socket')
    }

    this.isConnecting = false
    this.reconnectAttempts = 0

    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }

    this.notifyAllWindows('socket-disconnected', { reason: 'manual' })
  }

  public emit(eventName: string, data?: unknown): void {
    if (!this.socket || !this.socket.connected) {
      if (this.debug) {
        console.log(`[SocketIpc] Tentativa de emit sem conexão: evento = "${eventName}"`)
      }
      this.notifyAllWindows('socket-emit-error', {
        eventName,
        error: 'Socket não conectado'
      })
      return
    }

    if (this.debug) {
      console.log(`[SocketIpc] Emitindo evento "${eventName}" com dados:`, data)
    }

    this.socket.emit(eventName, data)
  }

  public subscribeToEvent(eventName: string): void {
    if (!this.socket) {
      if (this.debug) {
        console.log(`[SocketIpc] Tentativa de inscrição sem socket: evento = "${eventName}"`)
      }
      return
    }

    if (this.debug) {
      console.log(`[SocketIpc] Inscrevendo-se no evento "${eventName}"`)
    }

    this.socket.on(eventName, (data) => {
      if (this.debug) {
        console.log(`[SocketIpc] Evento "${eventName}" recebido:`, data)
      }
      this.notifyAllWindows('socket-event-received', { eventName, data })
    })
  }

  public unsubscribeFromEvent(eventName: string): void {
    if (!this.socket) {
      if (this.debug) {
        console.log(
          `[SocketIpc] Tentativa de cancelar inscrição sem socket: evento = "${eventName}"`
        )
      }
      return
    }

    if (this.debug) {
      console.log(`[SocketIpc] Cancelando inscrição do evento "${eventName}"`)
    }

    this.socket.off(eventName)
  }

  private setupSocketListeners(): void {
    if (!this.socket) return

    // Evento de conexão bem-sucedida
    this.socket.on('connect', () => {
      this.isConnecting = false
      this.reconnectAttempts = 0

      if (this.debug) {
        console.log(`[SocketIpc] Conectado ao socket. ID: ${this.socket?.id}`)
      }

      this.notifyAllWindows('socket-connected', {
        socketId: this.socket?.id,
        url: this.config.url
      })
    })

    // Evento de desconexão
    this.socket.on('disconnect', (reason) => {
      this.isConnecting = false

      if (this.debug) {
        console.log(`[SocketIpc] Desconectado do socket. Razão: ${reason}`)
      }

      this.notifyAllWindows('socket-disconnected', { reason })

      // Tentar reconectar se não foi desconexão manual
      if (reason !== 'io client disconnect') {
        this.attemptReconnection()
      }
    })

    // Evento de erro de conexão
    this.socket.on('connect_error', (error) => {
      this.isConnecting = false

      if (this.debug) {
        console.log('[SocketIpc] Erro de conexão:', error.message)
      }

      this.notifyAllWindows('socket-connection-error', {
        error: error.message,
        reconnectAttempts: this.reconnectAttempts
      })

      this.attemptReconnection()
    })

    // Evento de erro genérico
    this.socket.on('error', (error) => {
      if (this.debug) {
        console.log('[SocketIpc] Erro do socket:', error)
      }

      this.notifyAllWindows('socket-error', { error })
    })
  }

  private attemptReconnection(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      if (this.debug) {
        console.log(
          `[SocketIpc] Máximo de tentativas de reconexão atingido (${this.maxReconnectAttempts})`
        )
      }

      this.notifyAllWindows('socket-reconnection-failed', {
        attempts: this.reconnectAttempts,
        maxAttempts: this.maxReconnectAttempts
      })
      return
    }

    this.reconnectAttempts++
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1) // Exponential backoff

    if (this.debug) {
      console.log(
        `[SocketIpc] Tentativa de reconexão ${this.reconnectAttempts}/${this.maxReconnectAttempts} em ${delay}ms`
      )
    }

    this.notifyAllWindows('socket-reconnecting', {
      attempt: this.reconnectAttempts,
      maxAttempts: this.maxReconnectAttempts,
      delay
    })

    setTimeout(() => {
      if (this.socket) {
        this.socket.disconnect()
        this.socket = null
      }
      this.connect()
    }, delay)
  }

  private notifyAllWindows(eventName: string, data?: unknown): void {
    if (this.debug) {
      console.log(
        `[SocketIpc] Notificando todas as janelas: evento = "${eventName}", dados =`,
        data
      )
    }

    BrowserWindow.getAllWindows().forEach((win) => {
      win.webContents.send(eventName, data)

      if (this.debug) {
        console.log(`[SocketIpc] Enviado "${eventName}" para window id=${win.id}`)
      }
    })
  }

  // Método público para obter o status da conexão
  public getConnectionStatus() {
    return {
      connected: this.socket?.connected || false,
      connecting: this.isConnecting,
      reconnectAttempts: this.reconnectAttempts,
      socketId: this.socket?.id || null
    }
  }

  // Método público para atualizar a configuração
  public updateConfig(newConfig: Partial<SocketConfig>): void {
    const wasConnected = this.socket?.connected || false

    if (wasConnected) {
      this.disconnect()
    }

    this.config = { ...this.config, ...newConfig }

    if (this.debug) {
      console.log('[SocketIpc] Configuração atualizada:', this.config)
    }

    if (wasConnected) {
      this.connect()
    }
  }
}
