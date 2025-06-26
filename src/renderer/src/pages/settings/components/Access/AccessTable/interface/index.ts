export type Access = {
  profile: string
  allowedActions: number
  connectedUsers: number
  createdAt: string
}

export type ColumnAccess = Access & {
  actions?: string
}
