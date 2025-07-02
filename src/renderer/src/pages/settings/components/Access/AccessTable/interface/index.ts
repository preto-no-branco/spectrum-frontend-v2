export type Access = {
  id: string
  profile: string
  allowedActions: {
    [key: string]: string[]
  }
  connectedUsers: {
    id: string
    name: string
  }[]
  createdAt: string
}

export type ColumnAccess = Access & {
  actions?: string
}
