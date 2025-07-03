import { DataTable } from '@renderer/components/Table'
import { CategoriesTableProps, ColumnCategories } from './interface'
import { useCategoriesTable } from './useCategoriesTable'

export function CategoriesTable({ categoriesData, ...props }: CategoriesTableProps) {
  const { categoriesColumns } = useCategoriesTable(props)

  return (
    <DataTable<ColumnCategories>
      columns={categoriesColumns}
      data={categoriesData}
      containerStyle="w-full border-0"
      rowStyle="border-0 hover:bg-muted/50"
    />
  )
}
