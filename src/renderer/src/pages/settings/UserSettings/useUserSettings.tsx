import { useCallback } from 'react'

export const useUserSettings = () => {
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

  const handleCreateUser = useCallback(() => {
    console.log('create user')
  }, [])

  const onSelectFilterChange = useCallback((value: string) => {
    console.log(value)
  }, [])

  return {
    userFilters,
    handleCreateUser,
    onSelectFilterChange
  }
}
