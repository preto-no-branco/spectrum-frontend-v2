import { FormHandle, createForm } from '@renderer/components/custom/Form'
import { registerUserForm } from '@renderer/core/configs/forms/user/registerUserForm'
import {
  CreateUser,
  registerUserSchema
} from '@renderer/core/configs/forms/user/registerUserSchema'
import {
  atLeastEightCharacters,
  atLeastOneNumberAndOneLowercase,
  atLeastOneSpecialCharacter,
  atLeastOneUppercase
} from '@renderer/core/constants/regex'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export const useFormModal = () => {
  const formRef = useRef<FormHandle>(null)
  const [passwordWatch, setPasswordWatch] = useState('')

  const passwordRules = useMemo(() => {
    return [
      {
        message: 'Pelo menos 1 letra e 1 número',
        isValid: atLeastOneNumberAndOneLowercase.test(passwordWatch)
      },
      {
        message: 'Pelo menos 1 letra maiúscula',
        isValid: atLeastOneUppercase.test(passwordWatch)
      },
      {
        message: 'Pelo menos 1 caractere especial',
        isValid: atLeastOneSpecialCharacter.test(passwordWatch)
      },
      {
        message: 'Pelo menos 8 caracteres',
        isValid: atLeastEightCharacters.test(passwordWatch)
      }
    ]
  }, [passwordWatch])

  const UserForm = useMemo(() => {
    return createForm<CreateUser>({
      fields: registerUserForm,
      schema: registerUserSchema,
      watch: {
        watchList: ['password'],
        onStateChange: ({ state }) => {
          setPasswordWatch(state ?? '')
        }
      },
      defaultValues: {
        accessLevel: 'user',
        position: 'Operador',
        fullName: 'Felipe',
        username: 'felipe.d'
      }
    })
  }, [])

  const handleSubmit = useCallback(() => {
    const { current: form } = formRef
    form?.submitForm((data) => {
      console.log(data)
    })
  }, [formRef])

  useEffect(() => {
    return () => {
      setPasswordWatch('')
    }
  }, [passwordWatch, formRef])

  return {
    UserForm,
    formRef,
    passwordRules,
    handleSubmit
  }
}
