import { Button } from '@renderer/components/ui/button'
import { Input } from '@renderer/components/ui/input'
import { AccessFormModal } from '@renderer/pages/settings/components/access/AccessFormModal'
import { AccessTable } from '@renderer/pages/settings/components/access/AccessTable'
import { Search } from 'lucide-react'
import { useAccessSettings } from './useAccessSettings'

export default function AccessSettings() {
  const {
    handleEditAccess,
    handleDeleteAccess,
    handleCreateAccess,
    isCreateAccessModalOpen,
    onCloseCreateAccessModal
  } = useAccessSettings()

  return (
    <div className="flex flex-col flex-1 w-full gap-3">
      <div className="flex w-full justify-between">
        <div className="flex gap-3">
          <Input type="search" placeholder="Pesquisar" leftIcon={<Search size={16} />} />
        </div>
        <Button onClick={handleCreateAccess}>Cadastrar acesso</Button>
      </div>

      <div className="flex flex-1">
        <AccessTable onEdit={handleEditAccess} onDelete={handleDeleteAccess} />
        <AccessFormModal
          isOpen={isCreateAccessModalOpen}
          onClose={onCloseCreateAccessModal}
          onSubmit={() => console.log('submit')}
        />
      </div>
    </div>
  )
}
