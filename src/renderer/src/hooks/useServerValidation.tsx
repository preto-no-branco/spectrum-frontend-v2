import { useEffect, useReducer } from 'react'
import { useDebounce } from '@renderer/hooks/useDebounce'
import { CheckCircle2, CircleX, Loader2 } from 'lucide-react'
import axios from 'axios'
import { showToast } from '@renderer/hooks/useToast'

export type ServerValidationStatus = 'idle' | 'testing' | 'success' | 'error'

export interface ServerStatusState {
  status: ServerValidationStatus
  icon: () => React.ReactNode
  message?: string
}

export const statusIcons: Record<ServerValidationStatus, () => React.ReactNode> = {
  idle: () => <CheckCircle2 strokeWidth={1} />,
  testing: () => <Loader2 className="animate-spin" />,
  success: () => <CheckCircle2 className="text-green-600" />,
  error: () => <CircleX strokeWidth={1} className="text-destructive/60" />
}

// State Machine Definition
export type ServerState = 'idle' | 'testing' | 'success' | 'error'

export type ServerEvent =
  | { type: 'TEST_SERVER'; payload: string }
  | { type: 'TEST_SUCCESS' }
  | { type: 'TEST_ERROR'; payload: string }
  | { type: 'RESET' }

export interface ServerContext {
  server: string
  errorMessage?: string
}

export interface ServerStateNode {
  status: ServerState
  context: ServerContext
}

// State Machine Actions
const serverStateMachine = (state: ServerStateNode, event: ServerEvent): ServerStateNode => {
  switch (state.status) {
    case 'idle':
      switch (event.type) {
        case 'TEST_SERVER':
          return {
            status: 'testing',
            context: { server: event.payload }
          }
        default:
          return state
      }

    case 'testing':
      switch (event.type) {
        case 'TEST_SUCCESS':
          return {
            status: 'success',
            context: { ...state.context }
          }
        case 'TEST_ERROR':
          return {
            status: 'error',
            context: {
              ...state.context,
              errorMessage: event.payload
            }
          }
        case 'TEST_SERVER':
          return {
            status: 'testing',
            context: { server: event.payload }
          }
        default:
          return state
      }

    case 'success':
      switch (event.type) {
        case 'TEST_SERVER':
          return {
            status: 'testing',
            context: { server: event.payload }
          }
        case 'RESET':
          return {
            status: 'idle',
            context: { server: '' }
          }
        default:
          return state
      }

    case 'error':
      switch (event.type) {
        case 'TEST_SERVER':
          return {
            status: 'testing',
            context: { server: event.payload }
          }
        case 'RESET':
          return {
            status: 'idle',
            context: { server: '' }
          }
        default:
          return state
      }

    default:
      return state
  }
}

// Helper to convert state machine state to UI state
const getStatusState = (machineState: ServerStateNode): ServerStatusState => {
  const statusMapping: Record<ServerState, ServerValidationStatus> = {
    idle: 'idle',
    testing: 'testing',
    success: 'success',
    error: 'error'
  }

  const status = statusMapping[machineState.status]

  return {
    status,
    icon: statusIcons[status],
    message: undefined
  }
}

const testServer = async (server: string): Promise<void> => {
  const url = new URL(server)

  if (!url.protocol.startsWith('http')) {
    throw new Error('Invalid protocol')
  }

  if (!url.hostname || !url.port) {
    throw new Error('Invalid server address')
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => {
    controller.abort()
  }, 2000)

  try {
    await axios.get(`${url.protocol}//${url.hostname}:${url.port}/ping`, {
      signal: controller.signal
    })
  } finally {
    clearTimeout(timeout)
  }
}

export function useServerValidation(serverUrl: string, debounceMs: number = 1500) {
  const [serverState, dispatch] = useReducer(serverStateMachine, {
    status: 'idle',
    context: { server: '' }
  })

  const debouncedServer = useDebounce(serverUrl, debounceMs)

  useEffect(() => {
    if (!debouncedServer) {
      dispatch({ type: 'RESET' })
      return
    }

    const testServerConnection = async () => {
      console.log('Testing server:', debouncedServer)

      dispatch({ type: 'TEST_SERVER', payload: debouncedServer })

      const startTime = Date.now()
      const minLoadingTime = 800 // minimum 800ms loading time

      try {
        await testServer(debouncedServer)

        const elapsedTime = Date.now() - startTime
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime)

        if (remainingTime > 0) {
          await new Promise((resolve) => setTimeout(resolve, remainingTime))
        }

        dispatch({ type: 'TEST_SUCCESS' })

        const url = new URL(debouncedServer)
        localStorage.setItem('server', `${url.protocol}//${url.hostname}:${url.port}`)

        showToast('success', 'Conexão bem-sucedida', {
          description: 'Servidor conectado com sucesso',
          duration: 3000
        })
      } catch (error) {
        let errorMessage = 'Servidor inválido, ex: http://192.168.0.60:4022'
        console.log('Error testing server:', error)

        if (axios.isAxiosError(error)) {
          if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
            errorMessage = 'Não foi possível integrar com o servidor'
          } else if (error.response?.status) {
            errorMessage = 'Não foi possível integrar com o servidor'
          }
        }

        const elapsedTime = Date.now() - startTime
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime)

        if (remainingTime > 0) {
          await new Promise((resolve) => setTimeout(resolve, remainingTime))
        }

        dispatch({ type: 'TEST_ERROR', payload: errorMessage })

        showToast('error', 'Erro ao conectar ao servidor', {
          description: errorMessage,
          duration: 3000
        })
      }
    }

    testServerConnection()
  }, [debouncedServer])

  const statusState = getStatusState(serverState)

  return {
    serverState,
    statusState,
    dispatch,
    isServerValid: serverState.status === 'success'
  }
}
