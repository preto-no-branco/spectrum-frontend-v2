import { DataTable } from '@renderer/components/Table'
import { ColumnUser } from './interface'
import { useUserTable } from './useUserTable'

export function UserTable() {
  const { usersColumns, usersData } = useUserTable()

  return <DataTable<ColumnUser> columns={usersColumns} data={usersData} />
}
