import { User } from '@renderer/services/userService/interfaces'

export type ColumnUser = User & {
  actions?: string
}

export interface UserTableProps {
  usersData: User[]
  onEdit: (user: User) => void
  onToggleActive: (userId: string, isActive: boolean) => void
}
