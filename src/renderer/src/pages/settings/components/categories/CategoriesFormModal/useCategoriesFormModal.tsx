import { useForm } from '@renderer/components/custom/Form'
import { CustomRowSwitch } from '@renderer/components/custom/switch/CustomRowSwitch'
import { Category } from '@renderer/services/categoryService/interfaces'
import { useCallback } from 'react'

export const useCategoriesFormModal = ({ defaultValues }: { defaultValues?: Category } = {}) => {
  const defaultIsActive = defaultValues?.active !== undefined ? defaultValues.active : true

  const { Form: CategoriesForm, submitForm } = useForm<Category>({
    // TODO: add validation
    // schema: categoresSchema,
    defaultValues: {
      name: defaultValues?.name || '',
      active: defaultIsActive
    },
    // TODO: fix this
    fields: {
      name: {
        label: 'Nome da categoria',
        placeholder: 'Ex: Detecção de materiais',
        colSpan: 2
      },
      active: {
        colSpan: 2,
        inputType: 'custom',
        label: 'Disponível na marcação de áreas',
        placeholder: 'Exibir para seleção na marcação de áreas.',
        options: [{ label: 'Disponível', checked: defaultIsActive, value: 'active' }],
        component: CustomRowSwitch
      }
    }
  })

  const handleSubmit = useCallback(
    (callback: (data: Category, id?: string) => void) => {
      submitForm((data) => {
        callback(data, defaultValues?.id)
      })
    },
    [submitForm, defaultValues?.id]
  )

  return {
    CategoriesForm,
    handleSubmit
  }
}
