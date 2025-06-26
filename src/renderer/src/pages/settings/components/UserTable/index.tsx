import { DataTable } from '@renderer/components/Table'
import { ColumnUser } from './interface'
import { useUserTable } from './useUserTable'

export interface UserTableProps {
  onEdit: (userId: string) => void
  onBlock: (userId: string, isActive: boolean) => void
}

export function UserTable({ onEdit, onBlock }: UserTableProps) {
  const { usersColumns, usersData } = useUserTable({ onEdit, onBlock })

  return (
    <DataTable<ColumnUser>
      columns={usersColumns}
      data={usersData}
      containerStyle="w-full border-0"
      rowStyle="border-0 hover:bg-muted/50"
    />
  )
}
