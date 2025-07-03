import { AppRouteValues } from '@renderer/core/constants/appRoutes'
import { BrowserWindowConstructorOptions } from 'electron/utility'

type WindowManager = {
  createWindow: (route: AppRouteValues) => void
}

export const useWindowManager = (): WindowManager => {
  const createWindow = (route: AppRouteValues, options?: BrowserWindowConstructorOptions): void => {
    window.api.window.create(route, options)
  }

  return {
    createWindow
  }
}
