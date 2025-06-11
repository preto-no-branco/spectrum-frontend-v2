import { useLocation } from 'react-router-dom'

export const useTopbar = () => {
  const location = useLocation()

  const routesToNames: Record<string, string | string[]> = {
    '/': 'Home',
    '/analysis': ['Análise', '8110-20240620-0009'],
    '/settings': 'Configurações'
  }

  return {
    location,
    routesToNames
  }
}
