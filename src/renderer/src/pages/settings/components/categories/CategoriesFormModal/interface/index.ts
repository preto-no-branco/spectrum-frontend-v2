import { Category } from '@renderer/services/categoryService/interfaces'

export interface CategoriesFormModalProps {
  isOpen: boolean
  defaultValues?: Category
  onClose: () => void
  onSubmit: (data: Category, categoryId?: string) => void
}
