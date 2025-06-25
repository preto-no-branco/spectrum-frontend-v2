import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { TableProps } from './interfaces'
import { useTable } from './useTable'

export function DataTable<T>({ columns, data }: TableProps<T>) {
  const { columns: columns_def, data: tanstack_data } = useTable({ data, columns })

  const table = useReactTable({
    data: tanstack_data,
    columns: columns_def,
    getCoreRowModel: getCoreRowModel<T>()
  })

  return (
    <div className="rounded-md border-none">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="px-3 border-none">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className="px-3 border-none hover:text-[#B3BDC0]"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
