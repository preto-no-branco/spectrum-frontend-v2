import { RoutePaths } from '@renderer/pages/routes'
import { useLocation } from 'react-router-dom'

export const useTopbar = () => {
  const location = useLocation()

  const routesToNames: Record<RoutePaths, string | string[]> = {
    '/': 'Home',
    '/analysis': ['Análise', '8110-20240620-0009'],
    '/settings': 'Configurações',
    '/history': 'Histórico'
  }

  return {
    location,
    routesToNames
  }
}
