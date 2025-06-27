import { useAlertDialog } from '@renderer/hooks/useAlertDialog'
import { useCallback, useState } from 'react'

export const useAccessSettings = () => {
  const { showAlert } = useAlertDialog()
  const [isCreateAccessModalOpen, setIsCreateAccessModalOpen] = useState(false)

  const onCloseCreateAccessModal = useCallback(() => {
    setIsCreateAccessModalOpen(false)
  }, [])

  const onSelectFilterChange = useCallback((value: string) => {
    console.log(value)
  }, [])

  const handleCreateAccess = useCallback(() => {
    setIsCreateAccessModalOpen(true)
  }, [])

  const handleEditAccess = useCallback((accessId: string) => {
    console.log('🚀 ~ accessId:', accessId)
    setIsCreateAccessModalOpen(true)
  }, [])

  const handleDeleteAccess = useCallback(
    (accessId: string) => {
      console.log('🚀 ~ accessId:', accessId)
      // showAlert({
      //   ...restToggleBlockUser,
      //   onConfirm: () => {
      //     console.log('🚀 ~ userId:', userId, isActive)
      //   },
      //   onConfirmProps: {
      //     className: btnClassName
      //   }
      // })
    },
    [showAlert]
  )

  return {
    isCreateAccessModalOpen,
    handleCreateAccess,
    handleEditAccess,
    handleDeleteAccess,
    onSelectFilterChange,
    onCloseCreateAccessModal
  }
}
