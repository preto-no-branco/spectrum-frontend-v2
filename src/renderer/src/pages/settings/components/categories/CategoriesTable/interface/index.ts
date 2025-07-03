import { Category } from '@renderer/services/categoryService/interfaces'

export type ColumnCategories = Category & {
  actions?: string
}

export interface CategoriesTableProps {
  categoriesData: Category[]
  onEdit: (category: Category) => void
  toggleActive: (category: Category, isActive: boolean) => void
}
