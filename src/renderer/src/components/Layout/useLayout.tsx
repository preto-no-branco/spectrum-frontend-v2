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
  const isAnalysisPage = location.pathname === APP_ROUTES.ANALYSIS

  const sidebarItems: SidebarItem[] = [
    {
      icon: <HomeIcon className="fill-content-tertiary" />,
      label: 'Home',
      onClick: () => {
        navigate(APP_ROUTES.HOME)
      }
    },
    {
      icon: <RadarIcon className="fill-content-tertiary" />,
      label: 'Analysis',
      onClick: () => {
        navigate(APP_ROUTES.ANALYSIS)
      }
    },
    {
      icon: <ContainerIcon className="fill-content-tertiary" />,
      label: 'Histórico',
      onClick: () => {
        navigate(APP_ROUTES.HISTORY)
      }
    },
    {
      icon: <SettingsIcon className="fill-content-tertiary" />,
      label: 'Configurações',
      onClick: () => {
        navigate(APP_ROUTES.SETTINGS.USER)
      }
    }
  ]

  return {
    isAnalysisPage,
    sidebarItems
  }
}
