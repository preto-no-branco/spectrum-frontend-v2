import { useAlertDialog } from '@renderer/hooks/useAlertDialog'
import { useCallback, useState } from 'react'

export const useUserSettings = () => {
  const { showAlert } = useAlertDialog()
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false)

  const userFilters = [
    {
      label: 'Todos os usuários',
      value: 'all'
    },
    {
      label: 'Usuários ativos',
      value: 'active'
    },
    {
      label: 'Usuários inativos',
      value: 'inactive'
    }
  ]

  const onCloseCreateUserModal = useCallback(() => {
    setIsCreateUserModalOpen(false)
  }, [])

  const onSelectFilterChange = useCallback((value: string) => {
    console.log(value)
  }, [])

  const handleCreateUser = useCallback(() => {
    setIsCreateUserModalOpen(true)
  }, [])

  const handleEditUser = useCallback((userId: string) => {
    console.log('🚀 ~ userId:', userId)
    setIsCreateUserModalOpen(true)
  }, [])

  const handleBlockUser = useCallback(
    (userId: string) => {
      showAlert({
        title: 'Você deseja bloquear este usuário?',
        message: 'Após o bloqueio, este usuário não poderá mais acessar o sistema.',
        onConfirm: () => {
          console.log('🚀 ~ userId:', userId)
        },
        confirmText: 'Bloquear',
        onConfirmProps: {
          className: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
        }
      })
    },
    [showAlert]
  )

  return {
    userFilters,
    isCreateUserModalOpen,
    handleCreateUser,
    handleEditUser,
    handleBlockUser,
    onSelectFilterChange,
    onCloseCreateUserModal
  }
}
