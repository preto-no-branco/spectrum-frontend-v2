import { useAlertDialog } from '@renderer/hooks/useAlertDialog'
import { User } from '@renderer/services/userService/interfaces'
import { useUserAPI } from '@renderer/services/userService/useUserAPI'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'

export const useUserSettings = () => {
  const { get, post, put, toggleStatus } = useUserAPI()
  const { showAlert } = useAlertDialog()

  const [userFilter, setUserFilter] = useState({
    searchTerm: '',
    filter: 'all'
  })
  const [usersData, setUsersData] = useState<User[]>([])
  const [userToEdit, setUserToEdit] = useState<User | null>(null)
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false)

  const statusFilters = [
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

  const filteredUsers = useMemo(() => {
    return usersData.filter((user) => {
      const nameLowerCase = user.name.toLowerCase()
      const userNameLowerCase = user.username.toLowerCase()
      const searchTermLowerCase = userFilter.searchTerm.toLowerCase()

      const isNameMatch = nameLowerCase.includes(searchTermLowerCase)
      const isUserNameMatch = userNameLowerCase.includes(searchTermLowerCase)

      if (userFilter.filter === 'all') {
        return isNameMatch || isUserNameMatch
      }

      const isActiveMatch = userFilter.filter === 'active' ? user.active : true
      const isInactiveMatch = userFilter.filter === 'inactive' ? user.active : true

      return (
        (isActiveMatch && (isNameMatch || isUserNameMatch)) ||
        (isInactiveMatch && (isNameMatch || isUserNameMatch))
      )
    })
  }, [userFilter, usersData])

  const fetchUsers = useCallback(async () => {
    const data = await get()

    if (data) {
      setUsersData(data)
    }
  }, [get])

  const onSearchTermChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUserFilter({
        ...userFilter,
        searchTerm: event.target.value
      })
    },
    [userFilter]
  )

  const onCloseCreateUserModal = useCallback(() => {
    setIsCreateUserModalOpen(false)

    setTimeout(() => {
      setUserToEdit(null)
    }, 300)
  }, [])

  const onOpenCreateUserModal = useCallback(() => {
    setIsCreateUserModalOpen(true)
  }, [])

  const onSelectFilterChange = useCallback(
    (value: string) => {
      setUserFilter({
        ...userFilter,
        filter: value
      })
    },
    [userFilter]
  )

  const createUser = useCallback(
    async (data: User) => {
      // applyCategoryChanges({ data })
      const result = await post(data)

      if (result === 'user-created') {
        onCloseCreateUserModal()

        fetchUsers()
        return
      }

      // TODO: implement toast
      // applyCategoryChanges({ remove: true, data })
    },
    [post, onCloseCreateUserModal, fetchUsers]
  )

  const updateUser = useCallback(
    async (id: string, data: User) => {
      const result = await put(id, {
        ...data,
        password: 'Crocoatus4022'
      })

      if (result) {
        // applyCategoryChanges({
        //   data: {
        //     ...data,
        //     id
        //   }
        // })
        onCloseCreateUserModal()
      }

      fetchUsers()
    },
    [put, onCloseCreateUserModal, fetchUsers]
  )

  const toggleUserStatus = useCallback(
    async (id: string) => {
      const result = await toggleStatus(id)

      if (result) {
        fetchUsers()

        return
      }

      // TODO: implement toast
    },
    [toggleStatus, fetchUsers]
  )

  const handleEditUser = useCallback(
    (user: User) => {
      setUserToEdit(user)
      onOpenCreateUserModal()
    },
    [onOpenCreateUserModal, setUserToEdit]
  )

  const handleSubmit = useCallback(
    async (data: User, id?: string) => {
      if (id) {
        await updateUser(id, data)

        return
      }

      await createUser(data)
    },
    [createUser, updateUser]
  )

  const handleToggleActiveUser = useCallback(
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
          toggleUserStatus(userId)
        },
        onConfirmProps: {
          className: btnClassName
        }
      })
    },
    [showAlert, toggleUserStatus]
  )

  useEffect(() => {
    fetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    statusFilters,
    userToEdit,
    filteredUsers,
    isCreateUserModalOpen,
    handleSubmit,
    handleEditUser,
    handleToggleActiveUser,
    onSearchTermChange,
    onOpenCreateUserModal,
    onSelectFilterChange,
    onCloseCreateUserModal
  }
}
