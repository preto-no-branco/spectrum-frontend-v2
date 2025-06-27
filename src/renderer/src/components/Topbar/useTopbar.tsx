import { APP_ROUTES_CONFIGS } from '@renderer/core/configs/appRoutesConfigs'
import { useLocation } from 'react-router-dom'

export const useTopbar = () => {
  const location = useLocation()

  const translatedPathname = APP_ROUTES_CONFIGS[location.pathname]?.TRANSITION_NAME

  return {
    location,
    translatedPathname
  }
}
