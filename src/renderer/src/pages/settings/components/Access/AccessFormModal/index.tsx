import { Modal } from '@renderer/components/custom/Modal'
import { UserFormModalProps } from './interface'
import { useAccessFormModal } from './useAccessFormModal'

export function AccessFormModal({ isOpen, onClose, onSubmit }: UserFormModalProps) {
  console.log('🚀 ~ onSubmit:', onSubmit)
  const { AccessForm, formRef, handleSubmit } = useAccessFormModal()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cadastrar perfil de acesso"
      cancelText="Cancelar"
      confirmText="Cadastrar"
      contentProps={{ className: 'w-full' }}
      confirmButtonProps={{ onClick: handleSubmit }}
    >
      <AccessForm ref={formRef} columns={2} showSubmitButton={false} />
    </Modal>
  )
}
