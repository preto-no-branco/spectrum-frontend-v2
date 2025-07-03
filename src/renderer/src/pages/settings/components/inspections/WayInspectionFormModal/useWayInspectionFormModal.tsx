import { useForm } from '@renderer/components/custom/Form'
import { useCallback } from 'react'

export const useWayInspectionFormModal = () => {
  const { Form: WayInspectionForm, submitForm } = useForm<{
    name: string
    code: string
  }>({
    // schema: accessProfileSchema,
    fields: {
      name: {
        colSpan: 2,
        label: 'Nome do identificador',
        placeholder: 'Ex: Spectrum 1'
      },
      code: {
        label: 'Código',
        placeholder: 'Ex: 1234'
      }
    }
  })

  const handleSubmit = useCallback(() => {
    submitForm((data) => {
      console.log('🚀 ~ data:', data)
    })
  }, [submitForm])

  return {
    WayInspectionForm,
    handleSubmit
  }
}
