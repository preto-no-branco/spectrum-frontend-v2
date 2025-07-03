import { User } from '@renderer/services/userService/interfaces'

export interface UserFormModalProps {
  user?: User
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Omit<User, 'id'>, id?: string) => void
}
