import { AppRouteValues } from '@renderer/core/constants/appRoutes'

type WindowManager = {
  createWindow: (route: AppRouteValues) => void
}

export const useWindowManager = (): WindowManager => {
  const createWindow = (route: AppRouteValues): void => {
    window.api.createWindow(route)
  }

  return {
    createWindow
  }
}
