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
    (accessId: string, connectedUsers: { id: string; name: string }[] = []) => {
      console.log('🚀 ~ accessId:', accessId)
      const hasUsersWithAccess = connectedUsers.length > 0

      const title = 'Excluir perfil de acesso'

      if (hasUsersWithAccess) {
        showAlert({
          title,
          message:
            'Para excluir um perfil de acesso é preciso editar o acesso dos seguintes usuários:',
          contentComponent: (
            <ul className="flex flex-col gap-1 pl-4">
              {connectedUsers.map((user) => (
                <li key={user.id} className="font-bold text-sm list-disc list-outside">
                  {user.name}
                </li>
              ))}
            </ul>
          ),
          onConfirm: () => console.log('Confirmado')
        })

        return
      }

      showAlert({
        title,
        message:
          'Este perfil não possui usuários vinculados. A exclusão é permanente e não poderá ser desfeita.',
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
    isCreateAccessModalOpen,
    handleCreateAccess,
    handleEditAccess,
    handleDeleteAccess,
    onSelectFilterChange,
    onCloseCreateAccessModal
  }
}
