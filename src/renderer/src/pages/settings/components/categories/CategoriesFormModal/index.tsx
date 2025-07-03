import { Modal } from '@renderer/components/custom/Modal'
import { CategoriesFormModalProps } from './interface'
import { useCategoriesFormModal } from './useCategoriesFormModal'

export function CategoriesFormModal({
  isOpen,
  onClose,
  onSubmit,
  defaultValues
}: CategoriesFormModalProps) {
  const { CategoriesForm, handleSubmit } = useCategoriesFormModal({ defaultValues })

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${defaultValues ? 'Editar' : 'Nova'} categoria de análise`}
      cancelText="Cancelar"
      confirmText={defaultValues ? 'Salvar' : 'Cadastrar'}
      contentProps={{ className: 'w-full' }}
      confirmButtonProps={{ onClick: () => handleSubmit(onSubmit), isLoading: false }}
    >
      <CategoriesForm columns={2} />
    </Modal>
  )
}
