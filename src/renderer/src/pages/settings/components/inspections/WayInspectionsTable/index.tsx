import { DataTable } from '@renderer/components/Table'
import { ColumnWayInspection, WayInspetionTableProps } from './interface'
import { useWayInspetionTable } from './useWayInspetionTable'

export function WayInspectionsTable({ spectrums, onEdit, onDelete }: WayInspetionTableProps) {
  const { wayInspectionsColumns } = useWayInspetionTable({ onEdit, onDelete })

  return (
    <DataTable<ColumnWayInspection>
      columns={wayInspectionsColumns}
      data={spectrums}
      containerStyle="w-full border-0"
      rowStyle="border-0 hover:bg-muted/50"
    />
  )
}
