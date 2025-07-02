import { Button } from '@renderer/components/ui/button'
import { Input } from '@renderer/components/ui/input'
import { CategoriesFormModal } from '@renderer/pages/settings/components/categories/CategoriesFormModal'
import { CategoriesTable } from '@renderer/pages/settings/components/categories/CategoriesTable'
import { Search } from 'lucide-react'
import { useCategoriesSettings } from './useCategoriesSettings'

export default function CategoriesSettings() {
  const {
    handleEditCategory,
    handleDeleteCategory,
    handleCreateCategory,
    isCreateCategoryModalOpen,
    onCloseCreateCategoryModal
  } = useCategoriesSettings()

  return (
    <div className="flex flex-col flex-1 w-full gap-3">
      <div className="flex w-full justify-between">
        <div className="flex gap-3">
          <Input type="search" placeholder="Pesquisar" leftIcon={<Search size={16} />} />
        </div>
        <Button onClick={handleCreateCategory}>Cadastrar categoria</Button>
      </div>

      <div className="flex flex-1">
        <CategoriesTable onEdit={handleEditCategory} onDelete={handleDeleteCategory} />
        <CategoriesFormModal
          isOpen={isCreateCategoryModalOpen}
          onClose={onCloseCreateCategoryModal}
          onSubmit={() => console.log('submit')}
        />
      </div>
    </div>
  )
}
