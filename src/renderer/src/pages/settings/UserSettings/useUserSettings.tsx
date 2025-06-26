import { useCallback, useState } from 'react'

export const useUserSettings = () => {
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

  return {
    userFilters,
    isCreateUserModalOpen,
    handleCreateUser,
    handleEditUser,
    onSelectFilterChange,
    onCloseCreateUserModal
  }
}
