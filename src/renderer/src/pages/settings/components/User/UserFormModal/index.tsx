import { Modal } from '@renderer/components/custom/Modal'
import { CircleCheck } from 'lucide-react'
import { UserFormModalProps } from './interface'
import { useUserFormModal } from './useUserFormModal'

export function UserFormModal({ isOpen, user, onClose, onSubmit }: UserFormModalProps) {
  const { UserForm, passwordRules, handleSubmit } = useUserFormModal({ defaultValues: user })

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={user ? 'Editar usuário' : 'Novo usuário'}
      cancelText="Cancelar"
      confirmText={user ? 'Salvar' : 'Cadastrar'}
      contentProps={{ className: 'w-full' }}
      confirmButtonProps={{
        onClick: () => {
          handleSubmit((data) => {
            onSubmit(data, user?.id)
          })
        }
      }}
    >
      <UserForm columns={2} showSubmitButton={false}>
        <div className="flex flex-col">
          {passwordRules.map(({ message, isValid }, idx) => {
            const textColor = isValid ? 'text-primary' : 'text-content-tertiary'
            return (
              <div key={idx} className="flex items-center gap-2">
                <CircleCheck size={16} className={textColor} />
                <span className={textColor}>{message}</span>
              </div>
            )
          })}
        </div>
      </UserForm>
    </Modal>
  )
}
