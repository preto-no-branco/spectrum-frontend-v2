import { Button } from '@renderer/components/ui/button'
import { Input } from '@renderer/components/ui/input'
import { WayInspectionFormModal } from '@renderer/pages/settings/components/inspections/WayInspectionFormModal'
import { WayInspectionsTable } from '@renderer/pages/settings/components/inspections/WayInspectionsTable'
import { Search } from 'lucide-react'
import { useWayInspectionsSettings } from './useWayInspectionsSettings'

export default function WayInspectionsSettings() {
  const {
    filteredWayInspections,
    spectrumToEdit,
    isCreateWayIdentifierModalOpen,
    handleEditWayIdentifier,
    handleDeleteWayIdentifier,
    handleSubmitWayIdentifier,
    onSearchTermChange,
    onOpenCreateWayIdentifierModal,
    onCloseCreateWayIdentifierModal
  } = useWayInspectionsSettings()

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
        </div>
        <Button onClick={onOpenCreateWayIdentifierModal}>Cadastrar identificador</Button>
      </div>

      <div className="flex flex-1">
        <WayInspectionsTable
          spectrums={filteredWayInspections}
          onEdit={handleEditWayIdentifier}
          onDelete={handleDeleteWayIdentifier}
        />
        <WayInspectionFormModal
          isOpen={isCreateWayIdentifierModalOpen}
          onClose={onCloseCreateWayIdentifierModal}
          defaultValues={spectrumToEdit || undefined}
          onSubmit={handleSubmitWayIdentifier}
        />
      </div>
    </div>
  )
}
