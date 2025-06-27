import { createContext, ReactNode, useCallback, useMemo, useState } from 'react'
import { IAlertConfig, IAlertContext } from './interface'

export const AlertContext = createContext({} as IAlertContext)

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertConfig, setAlertConfig] = useState<IAlertConfig | null>(null)

  const showAlert = useCallback((config: IAlertConfig) => {
    setAlertConfig(config)
    setIsAlertOpen(true)
  }, [])

  const onCloseAlert = useCallback(() => {
    setIsAlertOpen(false)
    setTimeout(() => setAlertConfig(null), 300)
  }, [])

  const alertContextValue: IAlertContext = useMemo(() => {
    return {
      alertConfig,
      isAlertOpen,
      showAlert,
      onCloseAlert
    }
  }, [alertConfig, isAlertOpen, showAlert, onCloseAlert])

  return <AlertContext.Provider value={alertContextValue}>{children}</AlertContext.Provider>
}
