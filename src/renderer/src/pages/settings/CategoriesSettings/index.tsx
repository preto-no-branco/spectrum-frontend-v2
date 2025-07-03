import { Button } from '@renderer/components/ui/button'
import { Input } from '@renderer/components/ui/input'
import { CategoriesFormModal } from '@renderer/pages/settings/components/categories/CategoriesFormModal'
import { CategoriesTable } from '@renderer/pages/settings/components/categories/CategoriesTable'
import { Search } from 'lucide-react'
import { useCategoriesSettings } from './useCategoriesSettings'

export default function CategoriesSettings() {
  const {
    categoriesData,
    categoryToEdit,
    isCreateCategoryModalOpen,
    handleToggleActive,
    handleEditCategory,
    handleSubmitCategory,
    onSearchTermChange,
    onOpenCreateCategoryModal,
    onCloseCreateCategoryModal
  } = useCategoriesSettings()

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
        <Button onClick={onOpenCreateCategoryModal}>Cadastrar categoria</Button>
      </div>

      <div className="flex flex-1">
        <CategoriesTable
          categoriesData={categoriesData}
          onEdit={handleEditCategory}
          toggleActive={handleToggleActive}
        />
        <CategoriesFormModal
          isOpen={isCreateCategoryModalOpen}
          defaultValues={categoryToEdit || undefined}
          onClose={onCloseCreateCategoryModal}
          onSubmit={handleSubmitCategory}
        />
      </div>
    </div>
  )
}
