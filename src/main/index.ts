// src/index.ts

import { app, ipcMain, BrowserWindow, protocol } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import path from 'path'
import { spawn, ChildProcessWithoutNullStreams } from 'child_process'
import { WindowManager } from './window-manager'
import { WindowCreateIpc } from './ipcs/window-create.ipc'
import { SharedStateIpc } from './ipcs/shared-state.ipc'
import { IpcFactory } from './ipcs/ipc-factory'

let windowManager: WindowManager

// === Variáveis para o processo persistente do "cimp" ===
let cimpProcess: ChildProcessWithoutNullStreams | null = null
let stdoutBuffer = ''

type PendingRequest = {
  resolve: (value: string) => void
  reject: (reason: Error) => void
}
const pendingRequests: PendingRequest[] = []

// Detecta se estamos em modo de desenvolvimento
const isDev = !app.isPackaged

// Caminho base da pasta "resources" onde estão:
// - O executável "cimp"
// - O arquivo de input (xray10.tif)
// - O out.png gerado
const basePath = isDev ? path.resolve(__dirname, '..', '..', 'resources') : process.resourcesPath

// ─── IMPORTANTE: registrar o esquema ANTES de app.whenReady() ─────────────────
// Isso faz com que "img://" seja considerado seguro/standard pelo Chromium.
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'img',
    privileges: {
      secure: true,
      standard: true
    }
  }
])

/**
 * Inicia o processo Rust ("cimp") em background, em pipe-mode, para podermos
 * enviar comandos no stdin e receber resposta no stdout.
 */
function startCimpProcess(): void {
  const executableName = process.platform === 'win32' ? 'cimp.exe' : 'cimp'
  const cimpExecutablePath = path.join(basePath, executableName)

  cimpProcess = spawn(cimpExecutablePath, [], {
    stdio: ['pipe', 'pipe', 'pipe']
  })

  cimpProcess.stdout.on('data', (chunk: Buffer) => {
    stdoutBuffer += chunk.toString()
    let newlineIndex: number
    while ((newlineIndex = stdoutBuffer.indexOf('\n')) !== -1) {
      const line = stdoutBuffer.slice(0, newlineIndex).trim()
      stdoutBuffer = stdoutBuffer.slice(newlineIndex + 1)

      const req = pendingRequests.shift()
      if (req) {
        req.resolve(line)
      }
    }
  })

  cimpProcess.stderr.on('data', (chunk: Buffer) => {
    console.error(`[cimp stderr] ${chunk.toString()}`)
  })

  cimpProcess.on('error', (err) => {
    console.error(`Falha ao iniciar "cimp": ${err.message}`)
    pendingRequests.forEach(({ reject }) =>
      reject(new Error(`cimp falhou ao iniciar: ${err.message}`))
    )
    pendingRequests.length = 0
    cimpProcess = null
  })

  cimpProcess.on('exit', (code, signal) => {
    console.error(`"cimp" saiu com código ${code}, sinal ${signal}`)
    pendingRequests.forEach(({ reject }) =>
      reject(new Error(`cimp saiu inesperadamente (código ${code})`))
    )
    pendingRequests.length = 0
    cimpProcess = null
  })
}

/**
 * Envia ao cimp a string "<INPUT_IMG_PATH> <EFFECT>\n" e retorna uma Promise
 * que resolve quando o cimp enviar uma linha no stdout. O cimp, então,
 * escreve out.png em resources/out.png.
 *
 * @param effect - string com o efeito desejado (por exemplo, "invert" ou "clahe")
 */
function sendCimpCommand(effect: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!cimpProcess) {
      return reject(new Error('Processo cimp não está inicializado'))
    }

    pendingRequests.push({ resolve, reject })

    const INPUT_IMG_PATH = path.join(basePath, 'xray10.tif')
    // Recebe o effect via parâmetro, em vez de hardcoded.
    cimpProcess.stdin.write(`${INPUT_IMG_PATH} ${effect}\n`, (err) => {
      if (err) {
        const idx = pendingRequests.findIndex((r) => r.resolve === resolve && r.reject === reject)
        if (idx !== -1) pendingRequests.splice(idx, 1)
        reject(new Error(`Falha ao enviar comando para cimp: ${err.message}`))
      }
    })
  })
}

/**
 * Registra o protocolo customizado "img://", que direciona qualquer
 * request para "img://<nome-do-arquivo>" até {basePath}/<nome-do-arquivo>.
 *
 * Exemplo: se o React pedir <img src="img://out.png?t=123" />,
 * aqui a gente monta "out.png" → path.join(basePath, 'out.png').
 *
 * **OBSERVAÇÃO:** usamos **url.host + url.pathname** porque,
 * para uma URL como "img://out.png/?t=123", o parser JS vê:
 *   - url.host     === "out.png"
 *   - url.pathname === "/"
 */
function registerImageProtocol(): void {
  protocol.registerFileProtocol('img', (request, callback) => {
    try {
      const url = new URL(request.url)
      // url.host pode ser "out.png" (ou outro nome de arquivo)
      // url.pathname pode ser "/" ou "/subfolder/file.png" etc.
      let fileName = url.host + url.pathname

      // Remove barras iniciais ou finais redundantes:
      fileName = fileName.replace(/^\/+/, '').replace(/\/+$/, '')

      const fullPath = path.join(basePath, fileName)
      callback({ path: fullPath })
    } catch (error) {
      console.error('Erro ao mapear protocolo img:// → file:', error)
      callback({ error: -6 }) // -6 = FILE_NOT_FOUND
    }
  })
}

function createWindow(): void {
  const preloadPath = path.join(__dirname, '../preload/index.js')
  windowManager = new WindowManager(preloadPath)
}

function createIPCHandlers(): void {
  new WindowCreateIpc(windowManager)
  IpcFactory.create(SharedStateIpc, true)

  /**
   * Agora o handler 'run-cimp' aceita um parâmetro `effect` (string),
   * que pode ser "invert", "clahe", etc. O renderer deve chamar
   * window.api.runCimp(effect).
   */
  ipcMain.handle('run-cimp', async (_event, effect: string) => {
    try {
      console.log(`[IPC] Executando efeito: ${effect}`)
      const result = await sendCimpCommand(effect)
      // Quando o cimp terminar, ele escreveu resources/out.png
      // Retornamos apenZas "img://out.png"; o renderer acrescenta "?t=…" para invalidar cache
      const uri = 'img://out.png'
      console.log(`[IPC] Resultado do cimp: ${JSON.stringify(result)}`)
      return { success: true, data: uri }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido no cimp'
      return { success: false, error: message }
    }
  })
}

// ─── APLICAR QUANDO O APP ESTIVER PRONTO ───────────────────────────────────────
app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  // Registramos o protocolo IMEDIATAMENTE após o app estar “ready”
  // (já havíamos chamado registerSchemesAsPrivileged no topo)
  registerImageProtocol()

  startCimpProcess()
  createWindow()
  createIPCHandlers()

  app.on('browser-window-created', (_e, window: BrowserWindow) => {
    optimizer.watchWindowShortcuts(window)
  })

  app.on('activate', () => {
    if (windowManager.getAllWindows().length === 0) {
      windowManager.createWindow('/')
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (cimpProcess && !cimpProcess.killed) {
      cimpProcess.stdin.end()
    }
    app.quit()
  }
})

app.on('before-quit', () => {
  if (cimpProcess && !cimpProcess.killed) {
    cimpProcess.stdin.end()
  }
})
