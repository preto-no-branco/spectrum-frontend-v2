import { Form } from '@renderer/components/Form'
import { Modal } from '@renderer/components/Modal'
import { registerUserForm } from '@renderer/core/configs/forms/user/registerUserForm'
import {
  CreateUser,
  registerUserSchema
} from '@renderer/core/configs/forms/user/registerUserSchema'
import { User } from '@renderer/pages/settings/components/UserTable/interface'

export interface UserFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  // TODO: implement user interface
  user?: User
}

export function UserFormModal({ isOpen, onClose, onSubmit }: UserFormModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cadastrar usuário"
      cancelText="Cancelar"
      confirmText="Cadastrar"
      confirmButtonProps={{ onClick: onSubmit }}
    >
      <Form<CreateUser>
        defaultValues={{ username: '' }}
        columns={2}
        schema={registerUserSchema}
        fields={registerUserForm}
        onSubmit={(data) => console.log(data)}
      />
    </Modal>
  )
}
