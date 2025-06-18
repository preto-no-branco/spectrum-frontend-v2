export interface TableProps<T> {
  data: T[]
  columns: Columns<T>
}

export type Columns<T> = (TableColumn<T> & { key: keyof T })[]

interface TableColumn<T> {
  key: keyof T
  header: string | (() => React.ReactNode)
  render?: (value: T[keyof T], row: T, index: number) => React.ReactNode
  width?: string | number
}
