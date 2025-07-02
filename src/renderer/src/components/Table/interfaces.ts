import { ColumnDef } from '@tanstack/react-table'
import { ComponentProps } from 'react'

type ComponentStyle = ComponentProps<'div'>['className']
export interface TableProps<T> {
  data: T[]
  columns: Columns<T>
}

interface TableColumn<T> {
  key: keyof T
  header: string | (() => React.ReactNode)
  render?: (value: T[keyof T], row: T, index: number) => React.ReactNode
  width?: string | number
}

export type Columns<T> = (TableColumn<T> & ColumnDef<T>)[]

export interface TableComponentProps<T> extends TableProps<T> {
  containerStyle?: ComponentStyle
  rowStyle?: ComponentStyle
}
