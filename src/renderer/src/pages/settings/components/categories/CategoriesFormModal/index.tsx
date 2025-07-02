import { Modal } from '@renderer/components/custom/Modal'
import { AccessFormModalProps } from './interface'
import { useCategoriesFormModal } from './useCategoriesFormModal'

export function CategoriesFormModal({ isOpen, onClose }: AccessFormModalProps) {
  const { CategoriesForm, handleSubmit } = useCategoriesFormModal()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Nova categoria de análise"
      cancelText="Cancelar"
      confirmText="Cadastrar"
      contentProps={{ className: 'w-full' }}
      confirmButtonProps={{ onClick: handleSubmit }}
    >
      <CategoriesForm columns={2} />
    </Modal>
  )
}
