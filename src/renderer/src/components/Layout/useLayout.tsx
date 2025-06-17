import { useLocation, useNavigate } from 'react-router-dom'
import { SidebarItem } from '../Sidebar/interfaces'
import HomeIcon from '../icons/HomeIcon'
import RadarIcon from '../icons/RadarIcon'
import ContainerIcon from '../icons/ContainerIcon'
import SettingsIcon from '../icons/SettingsIcon'
import { routes } from '@renderer/pages/routes'

export const useLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isAnalysisPage = location.pathname === routes.find((route) => route.id === 'analysis')?.path
  const isLoginPage = location.pathname === routes.find((route) => route.id === 'login')?.path

  const sidebarItems: SidebarItem[] = [
    {
      icon: <HomeIcon className="fill-content-tertiary" />,
      label: 'Home',
      onClick: () => {
        navigate('/home')
      }
    },
    {
      icon: <RadarIcon className="fill-content-tertiary" />,
      label: 'Analysis',
      onClick: () => {
        navigate('/analysis')
      }
    },
    {
      icon: <ContainerIcon className="fill-content-tertiary" />,
      label: 'Histórico',
      onClick: () => {
        navigate('/history')
      }
    },
    {
      icon: <SettingsIcon className="fill-content-tertiary" />,
      label: 'Configurações',
      onClick: () => {
        navigate('/settings')
      }
    }
  ]

  return {
    isAnalysisPage,
    sidebarItems,
    isLoginPage
  }
}
