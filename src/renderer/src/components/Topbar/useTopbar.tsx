import { RoutePaths, routes } from '@renderer/pages/routes'
import { useLocation } from 'react-router-dom'

export const useTopbar = () => {
  const location = useLocation()

  const isLoginPage = location.pathname === routes.find((route) => route.id === 'login')?.path

  const routesToNames: Record<RoutePaths, string | string[]> = {
    '/home': 'Home',
    '/analysis': ['Análise', '8110-20240620-0009'],
    '/settings': 'Configurações',
    '/history': 'Histórico',
    '/login': 'Login'
  }

  return {
    location,
    routesToNames,
    isLoginPage
  }
}
