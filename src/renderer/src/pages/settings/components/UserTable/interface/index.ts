export type User = {
  id: string
  fullName: string
  username: string
  status: 'active' | 'inactive'
  position: string
  accessLevel: 'admin' | 'user' | 'suport' | 'operator' | 'analyst'
  email: string
  lastAccess: string
}

export type ColumnUser = User & {
  actions: string
}
