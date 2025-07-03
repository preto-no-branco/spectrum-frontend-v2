import { Button } from '@renderer/components/ui/button'
import { Input } from '@renderer/components/ui/input'
import { Select } from '@renderer/components/ui/select'
import { UserFormModal } from '@renderer/pages/settings/components/user/UserFormModal'
import { UserTable } from '@renderer/pages/settings/components/user/UserTable'
import { ListFilter, Search } from 'lucide-react'
import { useUserSettings } from './useUserSettings'

export default function UserSettings() {
  const {
    statusFilters,
    userToEdit,
    filteredUsers,
    isCreateUserModalOpen,
    handleSubmit,
    handleEditUser,
    handleToggleActiveUser,
    onSearchTermChange,
    onOpenCreateUserModal,
    onCloseCreateUserModal,
    onSelectFilterChange
  } = useUserSettings()

  return (
    <div className="flex flex-col flex-1 w-full gap-3">
      <div className="flex w-full justify-between">
        <div className="flex gap-3">
          <Input
            type="search"
            placeholder="Pesquisar"
            leftIcon={<Search size={16} />}
            onChange={onSearchTermChange}
          />
          <Select
            label="Todos os usuários"
            showExternalLabel={false}
            placeholder="Todos os usuários"
            leftIcon={<ListFilter size={16} />}
            options={statusFilters}
            onValueChange={onSelectFilterChange}
          />
        </div>
        <Button onClick={onOpenCreateUserModal}>Cadastrar usuário</Button>
      </div>

      <div className="flex flex-1">
        <UserTable
          usersData={filteredUsers}
          onEdit={handleEditUser}
          onToggleActive={handleToggleActiveUser}
        />
        <UserFormModal
          isOpen={isCreateUserModalOpen}
          user={userToEdit ? { ...userToEdit, spectrums: [...userToEdit.spectrums] } : undefined}
          onClose={onCloseCreateUserModal}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}
