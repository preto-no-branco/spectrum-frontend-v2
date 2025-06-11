import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { DataTableProps } from './interfaces'



interface config<TData, TValue> {
  data: TData[]
  columns: TData, TValue[]
}

export function useTable<TData, TValue>({ data, columns }: DataTableProps<TData, TValue>) {
  const config

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return {
    table
  }
}
