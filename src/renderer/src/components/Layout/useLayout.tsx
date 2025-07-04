import { APP_ROUTES } from '@renderer/core/constants/appRoutes'
import { useLocation, useNavigate } from 'react-router-dom'
import { SidebarItem } from '../Sidebar/interfaces'
import ContainerIcon from '../icons/ContainerIcon'
import HomeIcon from '../icons/HomeIcon'
import RadarIcon from '../icons/RadarIcon'
import SettingsIcon from '../icons/SettingsIcon'

export const useLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isAnalysisPage = location.pathname === APP_ROUTES.ANALYSIS.INITIAL

  const disableLayoutPages: Set<string> = new Set([APP_ROUTES.ANALYSIS.DETAILS, APP_ROUTES.LOGIN])

  const isLayoutDisabled = disableLayoutPages.has(location.pathname)

  const sidebarItems: SidebarItem[] = [
    {
      icon: <HomeIcon className="hover:cursor-pointer fill-content-tertiary" />,
      label: 'Home',
      onClick: () => {
        navigate(APP_ROUTES.HOME)
      }
    },
    {
      icon: <RadarIcon className="hover:cursor-pointer fill-content-tertiary" />,
      label: 'Analysis',
      onClick: () => {
        navigate(APP_ROUTES.ANALYSIS.INITIAL)
      }
    },
    {
      icon: <ContainerIcon className="hover:cursor-pointer fill-content-tertiary" />,
      label: 'Histórico',
      onClick: () => {
        navigate(APP_ROUTES.HISTORY)
      }
    },
    {
      icon: <SettingsIcon className="hover:cursor-pointer fill-content-tertiary" />,
      label: 'Configurações',
      onClick: () => {
        navigate(APP_ROUTES.SETTINGS.USER)
      }
    }
  ]

  return {
    isAnalysisPage,
    sidebarItems,
    isLayoutDisabled
  }
}
