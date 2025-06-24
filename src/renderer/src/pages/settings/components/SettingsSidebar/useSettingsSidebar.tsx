import { APP_ROUTES } from '@renderer/core/constants/appRoutes'
import { useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const useSettingsSidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const sidebarOptItems = useMemo(() => {
    return [
      {
        title: 'Usuários',
        href: APP_ROUTES.SETTINGS.USER
      },
      {
        title: 'Gestão de acessos',
        href: APP_ROUTES.SETTINGS.ACCESS
      },
      {
        title: 'Ajustes do sistema',
        href: APP_ROUTES.SETTINGS.SYSTEM
      },
      {
        title: 'Categorias de análise',
        href: APP_ROUTES.SETTINGS.CATEGORIES
      },
      {
        title: 'Vias de inspeção',
        href: APP_ROUTES.SETTINGS.INSPECTION_WAYS
      }
    ]
  }, [])

  const getButtonVariant = useCallback(
    (href: string) => {
      return location.pathname === href ? 'default' : 'ghost'
    },
    [location]
  )

  const forwardTo = useCallback(
    (href: string) => {
      navigate(href)
    },
    [navigate]
  )
  return {
    forwardTo,
    getButtonVariant,
    sidebarOptItems
  }
}
