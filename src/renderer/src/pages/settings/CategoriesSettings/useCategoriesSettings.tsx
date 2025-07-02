import { useAlertDialog } from '@renderer/hooks/useAlertDialog'
import { useCallback, useState } from 'react'

export const useCategoriesSettings = () => {
  const { showAlert } = useAlertDialog()
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false)

  const onCloseCreateCategoryModal = useCallback(() => {
    setIsCreateCategoryModalOpen(false)
  }, [])

  const onSelectFilterChange = useCallback((value: string) => {
    console.log(value)
  }, [])

  const handleCreateCategory = useCallback(() => {
    setIsCreateCategoryModalOpen(true)
  }, [])

  const handleEditCategory = useCallback((categoryId: string) => {
    console.log('🚀 ~ categoryId:', categoryId)
    setIsCreateCategoryModalOpen(true)
  }, [])

  const handleDeleteCategory = useCallback(
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
    isCreateCategoryModalOpen,
    handleCreateCategory,
    handleEditCategory,
    handleDeleteCategory,
    onSelectFilterChange,
    onCloseCreateCategoryModal
  }
}
