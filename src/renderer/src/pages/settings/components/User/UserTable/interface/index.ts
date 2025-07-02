export type User = {
  id: string
  fullName: string
  username: string
  status: 'active' | 'inactive'
  position: string
  accessLevel: 'admin' | 'user' | 'suport' | 'operator' | 'analyst'
  email: string
  lastAccess: string
  isActive: boolean
}

export type ColumnUser = User & {
  actions: string
}
