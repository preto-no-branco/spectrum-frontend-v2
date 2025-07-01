import { AccessProfileCreate } from '@renderer/core/configs/forms/accessProfiles/accessProfileSchema'

export interface AccessFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: AccessProfileCreate) => void
  // TODO: implement user interface
}
