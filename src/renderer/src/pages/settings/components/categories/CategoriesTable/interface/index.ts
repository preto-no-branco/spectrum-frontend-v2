export type Category = {
  id: string
  name: string
  isActive: boolean
  createdAt: string
}

export type ColumnCategories = Category & {
  actions?: string
}
