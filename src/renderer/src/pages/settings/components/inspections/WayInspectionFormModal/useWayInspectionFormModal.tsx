import { useForm } from '@renderer/components/custom/Form'
import { SpectrumSettings } from '@renderer/services/spectrumSettingsService/interfaces'
import { useCallback } from 'react'

export const useWayInspectionFormModal = ({
  defaultValues
}: {
  defaultValues?: SpectrumSettings
}) => {
  const { Form: WayInspectionForm, submitForm } = useForm<SpectrumSettings>({
    // schema: accessProfileSchema,
    defaultValues,
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

  const handleSubmit = useCallback(
    (callback: (data: SpectrumSettings, id?: string) => void) => {
      submitForm((data) => {
        callback(data, defaultValues?.id)
      })
    },
    [submitForm, defaultValues?.id]
  )

  return {
    WayInspectionForm,
    handleSubmit
  }
}
