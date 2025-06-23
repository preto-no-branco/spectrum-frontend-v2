import { Button } from '@renderer/components/ui/button'
import { Input } from '@renderer/components/ui/input'
import { Select } from '@renderer/components/ui/select'
import { ListFilter, Search } from 'lucide-react'
import { useUserSettings } from './useUserSettings'

export default function UserSettings() {
  const { userFilters, handleCreateUser, onSelectFilterChange } = useUserSettings()

  return (
    <div className="flex flex-col flex-1 w-full">
      <div className="flex w-full justify-between">
        <div className="flex gap-3">
          <Input type="search" placeholder="Pesquisar" leftIcon={<Search size={16} />} />
          <Select
            label="Todos os usuários"
            placeholder="Todos os usuários"
            leftIcon={<ListFilter size={16} />}
            options={userFilters}
            onValueChange={onSelectFilterChange}
          />
        </div>
        <Button onClick={handleCreateUser}>Cadastrar usuário</Button>
      </div>
    </div>
  )
}
