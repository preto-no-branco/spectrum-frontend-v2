import { DataTable } from '@renderer/components/Table'
import { ColumnUser, UserTableProps } from './interface'
import { useUserTable } from './useUserTable'

export function UserTable({ onEdit, onToggleActive, usersData }: UserTableProps) {
  const { usersColumns } = useUserTable({ onEdit, onToggleActive })

  return (
    <DataTable<ColumnUser>
      columns={usersColumns}
      data={usersData}
      containerStyle="w-full border-0"
      rowStyle="border-0 hover:bg-muted/50"
    />
  )
}
