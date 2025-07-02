import { CreateUser } from '@renderer/core/configs/forms/user/registerUserSchema'
import { User } from '@renderer/pages/settings/components/user/UserTable/interface'

export interface UserFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CreateUser) => void
  // TODO: implement user interface
  user?: User
}
