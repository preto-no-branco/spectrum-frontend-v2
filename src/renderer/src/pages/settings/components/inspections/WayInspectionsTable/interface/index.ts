export type WayInspection = {
  id: string
  name: string
  code: string
  isActive: boolean
  createdAt: string
}

export type ColumnWayInspection = WayInspection & {
  actions?: string
}
