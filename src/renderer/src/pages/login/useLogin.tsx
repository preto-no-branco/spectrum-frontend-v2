import { useEffect, useState, useReducer } from 'react'
import { useDebounce } from '@renderer/hooks/useDebounce'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from './interfaces'
import { CheckCircle2, CircleX, Loader2 } from 'lucide-react'
import axios from 'axios'
import { showToast } from '@renderer/hooks/useToast'

export type LoginStatus = 'idle' | 'loading' | 'success' | 'error'

export interface StatusState {
  status: LoginStatus
  icon: () => React.ReactNode
  message?: string
}

export const statusIcons: Record<LoginStatus, () => React.ReactNode> = {
  idle: () => <CheckCircle2 strokeWidth={1} />,
  loading: () => <Loader2 className="animate-spin" />,
  success: () => <CheckCircle2 className="text-green-600" />,
  error: () => <CircleX strokeWidth={1} className="text-destructive/60" />
}

// State Machine Definition
type ServerState = 'idle' | 'testing' | 'success' | 'error'

type ServerEvent =
  | { type: 'TEST_SERVER'; payload: string }
  | { type: 'TEST_SUCCESS' }
  | { type: 'TEST_ERROR'; payload: string }
  | { type: 'RESET' }

interface ServerContext {
  server: string
  errorMessage?: string
}

interface ServerStateNode {
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
const getStatusState = (machineState: ServerStateNode): StatusState => {
  const statusMapping: Record<ServerState, LoginStatus> = {
    idle: 'idle',
    testing: 'loading',
    success: 'success',
    error: 'error'
  }

  const status = statusMapping[machineState.status]

  return {
    status,
    icon: statusIcons[status],
    // Remove message from status state since we're using toast
    message: undefined
  }
}

const baseFields = [
  {
    label: 'Nome de usuário',
    placeholder: 'Example.creatus',
    name: 'username',
    type: 'text'
  },
  {
    label: 'Senha',
    placeholder: 'Senha de acesso',
    type: 'password',
    name: 'password'
  },
  {
    label: 'Servidor',
    placeholder: 'Ex: localhost:8080',
    icon: statusIcons.idle,
    type: 'text',
    name: 'server'
  }
] as const

export function useLogin() {
  const [serverState, dispatch] = useReducer(serverStateMachine, {
    status: 'idle',
    context: { server: '' }
  })

  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const togglePasswordVisibility = () => setIsPasswordHidden((prev) => !prev)

  const form = useForm({
    resolver: zodResolver(loginSchema)
  })

  const server = form.watch('server')
  const debounced = useDebounce(server, 1500)

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

  useEffect(() => {
    if (!debounced) {
      dispatch({ type: 'RESET' })
      return
    }

    const testServerConnection = async () => {
      console.log('Testing server:', debounced)

      dispatch({ type: 'TEST_SERVER', payload: debounced })

      const startTime = Date.now()
      const minLoadingTime = 800 // minimum 800ms loading time

      try {
        await testServer(debounced)

        const elapsedTime = Date.now() - startTime
        const remainingTime = Math.max(0, minLoadingTime - elapsedTime)

        if (remainingTime > 0) {
          await new Promise((resolve) => setTimeout(resolve, remainingTime))
        }

        dispatch({ type: 'TEST_SUCCESS' })

        // Show success toast
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

        // Show error toast
        showToast('error', 'Erro ao conectar ao servidor', {
          description: errorMessage,
          duration: 3000
        })
      }
    }

    testServerConnection()
  }, [debounced])

  const statusState = getStatusState(serverState)
  const isValid = form.formState.isValid
  const submitDisable = !(isValid && serverState.status === 'success')

  const onSubmit = (data: any) => {
    console.log('submit', data)
  }

  return {
    form,
    fields: baseFields,
    onSubmit,
    submitDisable,
    statusState,
    isPasswordHidden,
    togglePasswordVisibility,
    serverMachineState: serverState,
    dispatchServerEvent: dispatch
  }
}
