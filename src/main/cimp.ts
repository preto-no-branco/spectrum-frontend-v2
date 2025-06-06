// src/main.js (ou main.ts)
import { app } from 'electron'
import path from 'path'
import { spawn } from 'child_process'

// Se estiver empacotado (production), use process.resourcesPath
// Caso contrário (development), aponte para o resources/ no root
const isDev = !app.isPackaged
const basePath = isDev ? path.resolve(__dirname, '..', '..', 'resources') : process.resourcesPath
const INPUT_IMG_PATH = path.join(basePath, 'xray10.tif')

const MACOS_EXECUTABLE_PATH = path.join(basePath, 'cimp')

/**
 * Retorna uma Promise que resolve para o Base64 gerado pelo `cimp`.
 */
export function runCimpAsync(): Promise<string> {
  return new Promise((resolve, reject) => {
    const args = [INPUT_IMG_PATH, 'clahe']
    const proc = spawn(MACOS_EXECUTABLE_PATH, args, {
      stdio: ['ignore', 'pipe', 'pipe']
    })

    let stdoutData = ''
    let stderrData = ''

    proc.stdout.on('data', (chunk) => {
      stdoutData += chunk.toString()
    })

    proc.stderr.on('data', (chunk) => {
      stderrData += chunk.toString()
    })

    proc.on('error', (err) => {
      reject(new Error(`Falha ao executar cimp: ${err.message}`))
    })

    proc.on('close', (code) => {
      if (code === 0) {
        resolve(stdoutData.trim())
      } else {
        reject(new Error(`cimp saiu com código ${code}: ${stderrData.trim()}`))
      }
    })
  })
}


// Seu resto do código de criação de janela, etc.
// e.g. app.whenReady().then(criarJanela).
