import { useForm } from '@renderer/components/custom/Form'
import { CustomRowSwitch } from '@renderer/components/custom/switch/CustomRowSwitch'
import { useCallback } from 'react'

export const useCategoriesFormModal = () => {
  const { Form: CategoriesForm, submitForm } = useForm<{
    name: string
    areaMarking?: boolean
  }>({
    // schema: accessProfileSchema,
    defaultValues: {
      areaMarking: true
    },
    fields: {
      name: {
        label: 'Nome da categoria',
        placeholder: 'Ex: Detecção de materiais',
        colSpan: 2
      },
      areaMarking: {
        colSpan: 2,
        inputType: 'custom',
        label: 'Disponível na marcação de áreas',
        placeholder: 'Exibir para seleção na marcação de áreas.',
        options: [{ label: 'Permitir tudo', value: 'all' }],
        component: CustomRowSwitch
      }
    }
  })

  const handleSubmit = useCallback(() => {
    submitForm((data) => {
      console.log('🚀 ~ data:', data)
    })
  }, [submitForm])

  return {
    CategoriesForm,
    handleSubmit
  }
}
