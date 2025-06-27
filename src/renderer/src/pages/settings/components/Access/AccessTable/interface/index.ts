export type Access = {
  id: string
  profile: string
  allowedActions: number
  connectedUsers: number
  createdAt: string
}

export type ColumnAccess = Access & {
  actions?: string
}
