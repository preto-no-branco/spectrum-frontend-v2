import { Modal } from '@renderer/components/Modal'
import { CircleCheck } from 'lucide-react'
import { UserFormModalProps } from './interface'
import { useFormModal } from './useFormModal'

export function UserFormModal({ isOpen, onClose, onSubmit }: UserFormModalProps) {
  const { UserForm, formRef, passwordRules, handleSubmit } = useFormModal()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cadastrar usuário"
      cancelText="Cancelar"
      confirmText="Cadastrar"
      contentProps={{ className: 'w-full' }}
      confirmButtonProps={{ onClick: handleSubmit }}
    >
      <UserForm ref={formRef} columns={2} showSubmitButton={false} onSubmit={onSubmit}>
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
