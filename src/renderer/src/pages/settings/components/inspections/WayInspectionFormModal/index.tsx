import { Modal } from '@renderer/components/custom/Modal'
import { WayInspectionFormModalProps } from './interface'
import { useWayInspectionFormModal } from './useWayInspectionFormModal'

export function WayInspectionFormModal({ isOpen, onClose }: WayInspectionFormModalProps) {
  const { WayInspectionForm, handleSubmit } = useWayInspectionFormModal()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Novo identificador de via"
      cancelText="Cancelar"
      confirmText="Cadastrar"
      contentProps={{ className: 'w-full' }}
      confirmButtonProps={{ onClick: handleSubmit }}
    >
      <WayInspectionForm columns={3} />
    </Modal>
  )
}
