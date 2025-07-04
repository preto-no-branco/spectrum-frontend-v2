import { Modal } from '@renderer/components/custom/Modal'
import { WayInspectionFormModalProps } from './interface'
import { useWayInspectionFormModal } from './useWayInspectionFormModal'

export function WayInspectionFormModal({
  isOpen,
  onClose,
  onSubmit,
  defaultValues
}: WayInspectionFormModalProps) {
  const { WayInspectionForm, handleSubmit } = useWayInspectionFormModal({ defaultValues })

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${defaultValues ? 'Editar' : 'Novo'} identificador de via`}
      cancelText="Cancelar"
      confirmText={defaultValues ? 'Salvar' : 'Cadastrar'}
      contentProps={{ className: 'w-full' }}
      confirmButtonProps={{ onClick: () => handleSubmit(onSubmit), isLoading: false }}
    >
      <WayInspectionForm columns={3} />
    </Modal>
  )
}
