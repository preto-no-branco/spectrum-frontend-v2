import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { LoginFormData, loginSchema } from './interfaces'
import { useServerValidation } from '@hooks/useServerValidation'
import { usePasswordVisibility } from '@hooks/usePasswordVisibility'
import { statusIcons } from '@hooks/useServerValidation'
import { useAuth } from '@renderer/hooks/useAuth'
import { showToast } from '@renderer/hooks/useToast'

export interface AuthLoginState {
  isLoading: boolean
  error: string | null
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

export function useLoginForm() {
  const [authState, setAuthState] = useState<AuthLoginState>({
    isLoading: false,
    error: null
  })

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      server: ''
    }
  })

  const serverUrl = form.watch('server')
  const { login } = useAuth()
  const { isPasswordHidden, togglePasswordVisibility } = usePasswordVisibility()
  const {
    serverState,
    statusState,
    dispatch: dispatchServerEvent,
    isServerValid
  } = useServerValidation(serverUrl)

  const isFormValid = form.formState.isValid
  const isSubmitDisabled = !(isFormValid && isServerValid) || authState.isLoading

  const clearError = () => {
    setAuthState((prev) => ({ ...prev, error: null }))
  }

  const performLogin = async (data: LoginFormData): Promise<void> => {
    setAuthState({ isLoading: true, error: null })

    try {
      const url = new URL(data.server)

      login(
        {
          username: data.username,
          password: data.password
        },
        url
      )

      setAuthState({ isLoading: false, error: null })
    } catch (error) {
      console.error('Login failed:', error)

      const errorMessage = 'Verifique suas credenciais e tente novamente.'
      setAuthState({ isLoading: false, error: errorMessage })

      showToast('error', 'Erro ao fazer login', {
        description: errorMessage
      })

      throw error
    }
  }

  const handleSubmit = async (data: LoginFormData) => {
    console.log('submit', data)

    if (!isServerValid) {
      return
    }

    try {
      await performLogin(data)
    } catch (error) {
      console.error('Login submission failed:', error)
    }
  }

  const onSubmit = form.handleSubmit(handleSubmit)

  return {
    // Form management
    form,
    fields: baseFields,
    onSubmit,
    isSubmitDisabled,

    // Password visibility
    isPasswordHidden,
    togglePasswordVisibility,

    // Server validation
    statusState,
    serverState,
    dispatchServerEvent,
    isServerValid,

    // Authentication
    authState,
    clearError,

    // Form state
    isFormValid,
    isLoading: authState.isLoading
  }
}
