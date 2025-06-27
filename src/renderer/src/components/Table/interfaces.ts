export interface TableProps<T> {
  data: T[]
  columns: Columns<T>
}

export type Columns<T> = TableColumn<T>[]

export interface TableColumn<T> {
  key?: keyof T
  id?: string

  header: string | (() => React.ReactNode)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, row: T, index: number) => React.ReactNode
  width?: string | number
}
