import { DataTable } from '@renderer/components/Table'
import { ColumnWayInspection } from './interface'
import { useWayInspetionTable } from './useWayInspetionTable'

export interface WayInspetionTableProps {
  onEdit: (categoryId: string) => void
  onDelete: (id: string) => void
}

export function WayInspectionsTable({ onEdit, onDelete }: WayInspetionTableProps) {
  const { wayInspectionsColumns, wayInspectionsData } = useWayInspetionTable({ onEdit, onDelete })

  return (
    <DataTable<ColumnWayInspection>
      columns={wayInspectionsColumns}
      data={wayInspectionsData}
      containerStyle="w-full border-0"
      rowStyle="border-0 hover:bg-muted/50"
    />
  )
}
