import { useForm } from '@renderer/components/custom/Form'
import { accessProfileFields } from '@renderer/core/configs/forms/accessProfiles/accessProfileFields'
import {
  AccessProfileCreate,
  accessProfileSchema
} from '@renderer/core/configs/forms/accessProfiles/accessProfileSchema'
import { useCallback } from 'react'

export const useAccessFormModal = () => {
  const {
    Form: AccessForm,
    submitForm
    // watch
  } = useForm<AccessProfileCreate>({
    schema: accessProfileSchema,
    fields: accessProfileFields
    // watch: {
    // watchList: ['allAccess'],
    // onStateChange(data) {
    //   console.log('🚀 ~ data:', data)
    // }
    // },
  })

  const handleSubmit = useCallback(() => {
    submitForm((data) => {
      console.log('🚀 ~ data:', data)
    })
  }, [submitForm])

  return {
    AccessForm,
    handleSubmit
  }
}
