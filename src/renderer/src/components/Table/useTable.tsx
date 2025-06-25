import { ColumnDef } from '@tanstack/react-table'
import { TableProps } from './interfaces'

export function useTable<T>({ data, columns }: TableProps<T>) {
  const columns_def: ColumnDef<T>[] = columns.map((column) => {
    const { key, header, render, cell, ...rest } = column

    return {
      accessorKey: key,
      header: header,
      cell:
        cell ??
        ((info) => {
          const value = info.row.getValue<T[keyof T]>(info.column.id)
          return render ? render(value, info.row.original, info.row.index) : value
        }),
      ...rest
    }
  })
  return {
    columns: columns_def,
    data
  }
}
