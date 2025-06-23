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

  const sidebarItems: SidebarItem[] = [
    {
      icon: <HomeIcon className="hover:cursor-pointer fill-content-tertiary" />,
      label: 'Home',
      onClick: () => {
        navigate('/')
      }
    },
    {
      icon: <RadarIcon className="hover:cursor-pointer fill-content-tertiary" />,
      label: 'Analysis',
      onClick: () => {
        navigate('/analysis')
      }
    },
    {
      icon: <ContainerIcon className="hover:cursor-pointer fill-content-tertiary" />,
      label: 'Histórico',
      onClick: () => {
        navigate('/history')
      }
    },
    {
      icon: <SettingsIcon className="hover:cursor-pointer fill-content-tertiary" />,
      label: 'Configurações',
      onClick: () => {
        navigate('/settings')
      }
    }
  ]

  return {
    isAnalysisPage,
    sidebarItems
  }
}
