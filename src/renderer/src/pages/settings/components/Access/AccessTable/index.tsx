import { DataTable } from '@renderer/components/Table'
import { ColumnAccess } from './interface'
import { useAccessTable } from './useAccessTable'

export interface AccessTableProps {
  onEdit: (accessId: string) => void
  onDelete: (accessId: string) => void
}

export function AccessTable({ onEdit, onDelete }: AccessTableProps) {
  const { accessColumns, accessData } = useAccessTable({ onEdit, onDelete })

  return (
    <DataTable<ColumnAccess>
      columns={accessColumns}
      data={accessData}
      containerStyle="w-full border-0"
      rowStyle="border-0 hover:bg-muted/50"
    />
  )
}
