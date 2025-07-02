import { useAlertDialog } from '@renderer/hooks/useAlertDialog'
import { useCallback, useState } from 'react'

export const useWayInspectionsSettings = () => {
  const { showAlert } = useAlertDialog()
  const [isCreateWayIdentifierModalOpen, setIsCreateWayIdentifierModalOpen] = useState(false)

  const onCloseCreateWayIdentifierModal = useCallback(() => {
    setIsCreateWayIdentifierModalOpen(false)
  }, [])

  const onSelectFilterChange = useCallback((value: string) => {
    console.log(value)
  }, [])

  const handleCreateWayIdentifier = useCallback(() => {
    setIsCreateWayIdentifierModalOpen(true)
  }, [])

  const handleEditWayIdentifier = useCallback((categoryId: string) => {
    console.log('🚀 ~ categoryId:', categoryId)
    setIsCreateWayIdentifierModalOpen(true)
  }, [])

  const handleDeleteWayIdentifier = useCallback(
    (categoryId: string) => {
      console.log('🚀 ~ categoryId:', categoryId)

      const title = 'Você deseja excluir esta categoria?'
      const message =
        'Esta categoria não poderá mais ser usada nas marcações de áreas. A exclusão é permanente e não poderá ser desfeita.'

      showAlert({
        title,
        message,
        confirmText: 'Excluir',
        onConfirm: () => console.log('Confirmado'),
        onConfirmProps: {
          className: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
        }
      })
    },
    [showAlert]
  )

  return {
    isCreateWayIdentifierModalOpen,
    handleCreateWayIdentifier,
    handleEditWayIdentifier,
    handleDeleteWayIdentifier,
    onSelectFilterChange,
    onCloseCreateWayIdentifierModal
  }
}
