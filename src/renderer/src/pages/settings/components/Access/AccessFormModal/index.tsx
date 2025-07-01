import { Modal } from '@renderer/components/custom/Modal'
import { AccessFormModalProps } from './interface'
import { useAccessFormModal } from './useAccessFormModal'

export function AccessFormModal({ isOpen, onClose }: AccessFormModalProps) {
  const { AccessForm, handleSubmit } = useAccessFormModal()

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
      <AccessForm columns={2} />
    </Modal>
  )
}
