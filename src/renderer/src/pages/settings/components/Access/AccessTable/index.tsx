import { DataTable } from '@renderer/components/Table'
import { ColumnAccess } from './interface'
import { useAccessTable } from './useAccessTable'

export interface AccessTableProps {
  onEdit: (userId: string) => void
  onBlock: (userId: string, isActive: boolean) => void
}

export function AccessTable({ onEdit, onBlock }: AccessTableProps) {
  const { accessColumns, accessData } = useAccessTable({ onEdit, onBlock })

  return (
    <DataTable<ColumnAccess>
      columns={accessColumns}
      data={accessData}
      containerStyle="w-full border-0"
      rowStyle="border-0 hover:bg-muted/50"
    />
  )
}
