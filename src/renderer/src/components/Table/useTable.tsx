import { ColumnDef } from '@tanstack/react-table'
import { TableProps } from './interfaces'

export function useTable<T>({ data, columns }: TableProps<T>) {
  const columns_def: ColumnDef<T>[] = columns.map((column) => ({
    accessorKey: column.key,
    header: column.header,
    cell: (info) => {
      const value = info.row.getValue<T[keyof T]>(info.column.id)
      return column.render ? column.render(value, info.row.original, info.row.index) : value
    }
  }))
  return {
    columns: columns_def,
    data
  }
}
