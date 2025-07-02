import { DataTable } from '@renderer/components/Table'
import { ColumnCategories } from './interface'
import { useCategoriesTable } from './useCategoriesTable'

export interface CategoriesTableProps {
  onEdit: (categoryId: string) => void
  onDelete: (id: string) => void
}

export function CategoriesTable({ onEdit, onDelete }: CategoriesTableProps) {
  const { categoriesColumns, categoriesData } = useCategoriesTable({ onEdit, onDelete })

  return (
    <DataTable<ColumnCategories>
      columns={categoriesColumns}
      data={categoriesData}
      containerStyle="w-full border-0"
      rowStyle="border-0 hover:bg-muted/50"
    />
  )
}
