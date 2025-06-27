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
    (userId: string, isActive: boolean) => {
      const toggleBlockUser = {
        true: {
          title: 'Bloquear usuário',
          message: 'Após o bloqueio, este usuário não poderá mais acessar o sistema.',
          confirmText: 'Bloquear',
          btnClassName: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
        },
        false: {
          title: 'Desbloquear usuário',
          message:
            'Após o desbloqueio, este usuário poderá voltar a acessar o sistema normalmente.',
          confirmText: 'Desbloquear',
          btnClassName: ''
        }
      }

      const { btnClassName, ...restToggleBlockUser } = toggleBlockUser[String(isActive)] || {}

      showAlert({
        ...restToggleBlockUser,
        onConfirm: () => {
          console.log('🚀 ~ userId:', userId, isActive)
        },
        onConfirmProps: {
          className: btnClassName
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
