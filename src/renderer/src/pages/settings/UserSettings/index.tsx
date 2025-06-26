import { Button } from '@renderer/components/ui/button'
import { Input } from '@renderer/components/ui/input'
import { Select } from '@renderer/components/ui/select'
import { UserFormModal } from '@renderer/pages/settings/components/UserFormModal'
import { UserTable } from '@renderer/pages/settings/components/UserTable'
import { ListFilter, Search } from 'lucide-react'
import { useUserSettings } from './useUserSettings'

export default function UserSettings() {
  const {
    userFilters,
    isCreateUserModalOpen,
    handleCreateUser,
    handleEditUser,
    onCloseCreateUserModal,
    onSelectFilterChange
  } = useUserSettings()

  return (
    <div className="flex flex-col flex-1 w-full gap-3">
      <div className="flex w-full justify-between">
        <div className="flex gap-3">
          <Input type="search" placeholder="Pesquisar" leftIcon={<Search size={16} />} />
          <Select
            label="Todos os usuários"
            showExternalLabel={false}
            placeholder="Todos os usuários"
            leftIcon={<ListFilter size={16} />}
            options={userFilters}
            onValueChange={onSelectFilterChange}
          />
        </div>
        <Button onClick={handleCreateUser}>Cadastrar usuário</Button>
      </div>

      <div className="flex flex-1">
        <UserTable onEdit={handleEditUser} />
        <UserFormModal
          isOpen={isCreateUserModalOpen}
          onClose={onCloseCreateUserModal}
          onSubmit={() => console.log('submit')}
        />
      </div>
    </div>
  )
}
