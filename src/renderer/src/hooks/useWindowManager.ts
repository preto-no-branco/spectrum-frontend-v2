type WindowManager = {
  createWindow: (route: string) => void
}

export const useWindowManager = (): WindowManager => {
  const createWindow = (route: string): void => {
    window.api.createWindow(route)
  }

  return {
    createWindow
  }
}
