import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { showToast } from './useToast'

const storageAuth = 'auth' as const

export const useAuth = () => {
  const navigate = useNavigate()

  const [token, setToken] = useState<string | null>(localStorage.getItem(storageAuth))

  const isAuthenticated = () => {
    return !!localStorage.getItem(storageAuth)
  }

  const login = async (
    { username, password }: { username: string; password: string },
    url: URL
  ) => {
    try {
      const loginResponse = await axios.post<{ token: string }>(
        `${url.protocol}//${url.hostname}:${url.port}/auth/login`,
        {},
        {
          auth: {
            username: username,
            password: password
          }
        }
      )

      if (loginResponse.data.token) {
        saveToken(loginResponse.data.token)
        navigate('/')
        return
      }
      throw new Error('Token não encontrado na resposta do login')
    } catch (error) {
      console.error('Login failed:', error)

      const errorMessage = 'Verifique suas credenciais e tente novamente.'

      showToast('error', 'Erro ao fazer login', {
        description: errorMessage
      })

      throw error
    }
  }

  const logout = () => {
    removeToken()
    navigate('/login')
  }

  const removeToken = () => {
    localStorage.removeItem(storageAuth)
    setToken(null)
  }

  const saveToken = (token: string) => {
    localStorage.setItem(storageAuth, token)
    setToken(token)
  }

  return {
    isAuthenticated,
    login,
    logout
  }
}
