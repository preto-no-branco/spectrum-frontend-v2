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
import { ScrollArea } from '../ui/scroll-area'

export function DataTable<T>({ columns, data }: TableProps<T>) {
  const { columns: columns_def, data: tanstack_data } = useTable({ data, columns })

  const table = useReactTable({
    data: tanstack_data,
    columns: columns_def,
    getCoreRowModel: getCoreRowModel<T>()
  })

  return (
    <div className="w-full overflow-x-auto rounded-md">
      <ScrollArea>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const col = columns.find((c) => c.key === header.column.id)
                  return (
                    <TableHead
                      key={header.id}
                      style={
                        col?.width
                          ? { width: typeof col.width === 'number' ? `${col.width}px` : col.width }
                          : {}
                      }
                    >
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
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
      </ScrollArea>
    </div>
  )
}
