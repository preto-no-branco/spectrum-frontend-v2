import { AlertContext } from '@renderer/core/contexts/AlertContext'
import { useContext } from 'react'

export const useAlertDialog = () => {
  return useContext(AlertContext)
}
